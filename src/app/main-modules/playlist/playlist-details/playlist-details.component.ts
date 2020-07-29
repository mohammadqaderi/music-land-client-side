import {Component, Input, OnInit} from '@angular/core';
import {Playlist} from '../../../models/media/playlist';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {

  @Input() playlist: Playlist;
  constructor() { }

  ngOnInit(): void {
  }

}
