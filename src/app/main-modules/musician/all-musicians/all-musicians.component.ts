import { Component, OnInit } from '@angular/core';
import {ArtistFilter} from '../../../Shared/classes/artist-filter';
import {ArtistData} from '../../../Shared/classes/artist-data';
import {HelperService} from '../../../Shared/services/helper.service';
import {Musician} from '../../../models/media/musician';
import {MusicianService} from '../../../services/media/musician.service';

@Component({
  selector: 'app-all-musicians',
  templateUrl: './all-musicians.component.html',
  styleUrls: ['./all-musicians.component.css']
})
export class AllMusiciansComponent implements OnInit {

  // data for filtering and searching
  musicians: Musician[];
  musicianFilter: ArtistFilter = new ArtistFilter();
  searchTerm: string;
  limit: number = 10;
  artistData = new ArtistData();

  // for spinner
  state = '';

  constructor(private musicianService: MusicianService,
              private helperService: HelperService) {
  }

  ngOnInit(): void {
    this.state = 'Loading...';
    this.helperService.showSpinner();
    this.musicianService.musicians.subscribe((allMusicians: Musician[]) => {
      this.musicians = allMusicians;
      this.helperService.hideSpinner();
    });
  }

  loadLimitedMusicians() {
    this.musicianService.getLimitedMusicians(this.limit)
      .subscribe((allMusicians: Musician[]) => {
        this.musicianService.musicians.next(allMusicians);
      });
    this.limit += 6;
  }

  isMusicBand() {
    if (this.musicianFilter.type) {
      return this.musicianFilter.type as unknown as string === 'MUSIC_BAND';
    }
  }

  getFilteredMusicians() {
    this.state = 'Filtering...';
    this.helperService.showSpinner();
    this.musicianFilter.limit = this.limit;
    this.musicianService.getFilteredMusicians(this.musicianFilter)
      .subscribe((musicians: Musician[]) => {
        this.musicianService.musicians.next(musicians);
      });
    this.helperService.hideSpinner();
  }


}
