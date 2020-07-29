import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {HelperService} from '../../../Shared/services/helper.service';
import {Music} from '../../../models/media/music';
import {MusicData} from '../../../Shared/classes/music-data';
import {MusicFilter} from '../../../Shared/classes/music-filter';
import {MusicService} from '../../../services/media/music.service';
import {FavoriteService} from '../../../services/user/favorite.service';
import {Track} from '../../../models/media/track';
import {Song} from '../../../models/media/song';
import {PlaylistService} from '../../../services/user/playlist.service';
import {Playlist} from '../../../models/media/playlist';

@Component({
  selector: 'app-all-musics',
  templateUrl: './all-musics.component.html',
  styleUrls: ['./all-musics.component.css']
})
export class AllMusicsComponent implements OnInit {

  musics: Music[];
  searchTerm: string;
  limit: number = 8;
  musicData: MusicData = new MusicData();
  musicFilter: MusicFilter = new MusicFilter();
  state = '';
  showSpinner = false;

  constructor(private musicService: MusicService,
              public authService: AuthService,
              private favService: FavoriteService,
              private helperService: HelperService,
              private playlistService: PlaylistService) {
  }

  ngOnInit(): void {
    this.state = 'Loading...';
    this.helperService.showSpinner();
    this.musicService.musics.subscribe((musics: Music[]) => {
      this.musics = musics;
      this.helperService.hideSpinner();
    });
  }


  getLimitedMusics() {
    this.showSpinner = true;
    this.musicService.getLimitedMusics(this.limit)
      .subscribe((musics: Music[]) => {
        this.musicService.musics.next(musics);
        this.showSpinner = false;
      });
    this.limit += 6;
  }

  // for interaction between music and favorite list and playlists

  addMusicToFavoriteList(music: Music) {
    this.musicService.pushToFavoriteList(music.id, this.favService.FavoriteListId)
      .subscribe((track: Track) => {
        music.tracks.push(track);
        this.helperService
          .openSnackbar(`Music added successfully to favorite list`, 'Okay');
      }, error => {
        this.helperService
          .openSnackbar(`An error occurred please try later`, 'Okay');
      });
  }

  addMusicToPlaylist(music: Music, playlistId: number) {
    this.musicService.pushToPlaylist(music.id, playlistId)
      .subscribe((track: Track) => {
        music.tracks.push(track);
        this.helperService
          .openSnackbar(`Music added successfully to playlist`, 'Okay');
      }, error => {
        this.helperService
          .openSnackbar(`An error occurred please try later`, 'Okay');
      });
  }

  isMusicAddedToFavoriteList(music: Music): boolean {
    return music.tracks.some(track => track.favoriteId === this.favService.FavoriteListId);
  }
  isMusicAddedToPlaylist(music: Music, playlistId: number): boolean {
    return music.tracks.
    some(track => track.playlistId === playlistId);
  }

  removeMusicFromFavoriteList(music: Music) {
    for (let i = 0; i < music.tracks.length; i++) {
      if (music.tracks[i].favoriteId === this.favService.FavoriteListId) {
        this.favService.removeTrackFavoriteList(this.favService.FavoriteListId,
          music.tracks[i].id)
          .subscribe(() => {
            music.tracks.splice(i, 1);
          });
        break;
      }
    }
  }
  removeMusicFromPlaylist(music: Music, playlistId: number) {
    for (let i = 0; i < music.tracks.length; i++) {
      if (music.tracks[i].favoriteId === playlistId) {
        this.playlistService.removeTrackFromPlaylist(playlistId,
          music.tracks[i].id)
          .subscribe(() => {
            music.tracks.splice(i, 1);
          });
        break;
      }
    }
  }

  getFilteredMusics() {
    this.state = 'Filtering...';
    this.musicFilter.limit = this.limit;
    this.helperService.showSpinner();
    this.musicService.getFilteredMusics(this.musicFilter)
      .subscribe((musics: Music[]) => {
        this.musicService.musics.next(musics);
        this.helperService.hideSpinner();
      });
  }
  getUserPlaylists(): Playlist[] {
    return this.playlistService.getCurrentPlaylists();
  }

}
