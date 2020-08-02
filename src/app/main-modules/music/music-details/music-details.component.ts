import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../../services/media/music.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Music} from '../../../models/media/music';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.css']
})
export class MusicDetailsComponent implements OnInit {

  music: Music;
  constructor(private musicService: MusicService,
              private route: ActivatedRoute) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.musicService.getMusicById(+params.get('id'))
        .subscribe((music) => {
          this.music = music;
        });
    });
  }

  ngOnInit(): void {

  }

}
