import {Component, OnInit} from '@angular/core';
import {SingerService} from '../../../services/media/singer.service';
import {HelperService} from '../../../Shared/services/helper.service';
import {Singer} from '../../../models/media/singer';
import {ArtistFilter} from '../../../Shared/classes/artist-filter';
import {ArtistData} from '../../../Shared/classes/artist-data';

@Component({
  selector: 'app-all-singers',
  templateUrl: './all-singers.component.html',
  styleUrls: ['./all-singers.component.css']
})
export class AllSingersComponent implements OnInit {

  // data for filtering and searching
  singers: Singer[];
  singerFilter: ArtistFilter = new ArtistFilter();
  searchTerm: string;
  limit: number = 10;
  artistData = new ArtistData();

  // for spinner
  state = '';

  constructor(private singerService: SingerService,
              private helperService: HelperService) {
  }

  ngOnInit(): void {
    this.state = 'Loading...';
    this.helperService.showSpinner();
    this.singerService.singers.subscribe((allSingers: Singer[]) => {
      this.singers = allSingers;
      this.helperService.hideSpinner();
    });
  }

  loadLimitedSingers() {
    this.singerService.getLimitedSingers(this.limit)
      .subscribe((singers: Singer[]) => {
        this.singerService.singers.next(singers);
      });
    this.limit += 6;
  }

  isMusicBand() {
    if (this.singerFilter.type) {
      return this.singerFilter.type as unknown as string === 'MUSIC_BAND';
    }
  }

  getFilteredSingers() {
    this.state = 'Filtering...';
    this.helperService.showSpinner();
    this.singerFilter.limit = this.limit;
    this.singerService.getFilteredSingers(this.singerFilter)
      .subscribe((singers: Singer[]) => {
        this.singerService.singers.next(singers);
      });
    this.helperService.hideSpinner();
  }

}
