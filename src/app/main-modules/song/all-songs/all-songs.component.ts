import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../services/media/song.service';
import {HelperService} from '../../../Shared/services/helper.service';
import {Song} from '../../../models/media/song';
import {SongData} from '../../../Shared/classes/song-data';
import {SongFilter} from '../../../Shared/classes/song-filter';
import {AuthService} from '../../../services/auth/auth.service';
import {FavoriteService} from '../../../services/user/favorite.service';
import {Favorite} from '../../../models/media/favorite';
import {Track} from '../../../models/media/track';
import {Playlist} from '../../../models/media/playlist';
import {PlaylistService} from '../../../services/user/playlist.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  songs: Song[];
  searchTerm: string;
  limit: number = 8;
  songData: SongData = new SongData();
  songFilter: SongFilter = new SongFilter();
  state = '';
  showSpinner = false;

  constructor(private songService: SongService,
              public authService: AuthService,
              private favService: FavoriteService,
              private playlistService: PlaylistService,
              private helperService: HelperService) {
  }

  ngOnInit(): void {
    this.state = 'Loading...';
    this.helperService.showSpinner();
    this.songService.songs.subscribe((songs: Song[]) => {
      this.songs = songs;
      this.helperService.hideSpinner();
    });
    if (this.authService.isLoggedIn()) {
      this.favService.getUserFavoriteList(+localStorage.getItem('favoriteListId'))
        .subscribe((fav: Favorite) => {
          this.favService.favoriteList.next(
            fav
          );
        });
    }
  }


  // for interaction between song and favorite list and playlists

  addSongToFavoriteList(song: Song) {
    this.songService.pushToFavoriteList(song.id, this.favService.FavoriteListId)
      .subscribe((track: Track) => {
        song.tracks.push(track);
        this.helperService
          .openSnackbar(`Song added successfully to favorite list`, 'Okay');
      }, error => {
        this.helperService
          .openSnackbar(`An error occurred please try later`, 'Okay');
      });
  }

  addSongToPlaylist(song: Song, playlist: Playlist) {
    this.songService.pushToPlaylist(song.id, playlist.id)
      .subscribe((track: Track) => {
        song.tracks.push(track);
        this.helperService
          .openSnackbar(`Song added successfully to playlist`, 'Okay');
      }, error => {
        this.helperService
          .openSnackbar(`An error occurred please try later`, 'Okay');
      });
  }

  isSongAddedToFavoriteList(song: Song): boolean {
    return song.tracks.some(track => track.favoriteId === this.favService.FavoriteListId);
  }

  isSongAddedToPlaylist(song: Song, playlistId: number): boolean {
    return song.tracks.some(track => track.playlistId === playlistId);
  }

  removeSongFromFavoriteList(song: Song) {
    for (let i = 0; i < song.tracks.length; i++) {
      if (song.tracks[i].favoriteId === this.favService.FavoriteListId) {
        this.favService.removeTrackFavoriteList(this.favService.FavoriteListId,
          song.tracks[i].id)
          .subscribe(() => {
            song.tracks.splice(i, 1);
          });
        break;
      }
    }
  }

  removeSongFromPlaylist(song: Song, playlistId: number) {
    for (let i = 0; i < song.tracks.length; i++) {
      if (song.tracks[i].favoriteId === playlistId) {
        this.playlistService.removeTrackFromPlaylist(playlistId,
          song.tracks[i].id)
          .subscribe(() => {
            song.tracks.splice(i, 1);
          });
        break;
      }
    }
  }


  getLimitedSongs() {
    this.showSpinner = true;
    this.songService.getLimitedSongs(this.limit)
      .subscribe((allSongs: Song[]) => {
        this.songService.songs.next(allSongs);
        this.showSpinner = false;
      });
    this.limit += 6;
  }

  getUserPlaylists(): Playlist[] {
    return this.playlistService.getCurrentPlaylists();
  }


  getFilteredSongs() {
    this.state = 'Filtering...';
    this.songFilter.limit = this.limit;
    this.helperService.showSpinner();
    this.songService.getFilteredSongs(this.songFilter)
      .subscribe((allSongs: Song[]) => {
        this.songService.songs.next(allSongs);
        this.helperService.hideSpinner();
      });
  }


}
