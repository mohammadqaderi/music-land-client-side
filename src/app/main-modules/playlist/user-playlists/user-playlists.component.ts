import {Component, OnInit, ViewChild} from '@angular/core';
import {PlaylistService} from '../../../services/user/playlist.service';
import {Playlist} from '../../../models/media/playlist';
import {PlaylistDetailsComponent} from '../playlist-details/playlist-details.component';
import {HelperService} from '../../../Shared/services/helper.service';

@Component({
  selector: 'app-user-playlists',
  templateUrl: './user-playlists.component.html',
  styleUrls: ['./user-playlists.component.css']
})
export class UserPlaylistsComponent implements OnInit {

  playlists: Playlist[];
  createPlaylistDto = {
    name: null
  };
  updatePlaylistDto = {
    name: null
  };
  @ViewChild('playlistDetailsComponent', {static: false})
  playlistDetailsComponent: PlaylistDetailsComponent;

  constructor(private playlistService: PlaylistService,
              public helperService: HelperService) {
  }

  ngOnInit(): void {
    this.playlistService.playlists.subscribe((userPlaylists: Playlist[]) =>{
      this.playlists = userPlaylists;
    })
  }

  createNewPlaylist() {
    this.playlistService.createNewPlaylist(
      this.createPlaylistDto
    ).subscribe((playlist: Playlist) => {
      this.playlists.push(playlist);
      this.playlistService.playlists.next(this.playlists);
      this.helperService.hideModal();
      this.helperService.openSnackbar('Playlist Created Successfully',
        'Okay');
      this.createPlaylistDto.name = null;
    });
  }

  updatePlaylist(list: Playlist) {
    this.playlistService.updatePlaylist(
      list.id,
      this.updatePlaylistDto
    ).subscribe((playlist: Playlist) => {
      for (let i = 0; i < this.playlists.length; i++) {
        if (this.playlists[i].id === list.id) {
          this.playlists[i] = playlist;
          this.playlistService.playlists.next(this.playlists);
          this.helperService.hideModal();
          this.helperService.openSnackbar('Playlist updated Successfully',
            'Okay');
          this.updatePlaylistDto.name = null;
          break;
        }
      }

    });
  }

  removeTrack(list: Playlist, trackId: number) {
    this.playlistService.removeTrackFromPlaylist(list.id, trackId)
      .subscribe(() => {
        for (let i = 0; i < this.playlists.length; i++) {
          if (this.playlists[i].id === list.id) {
            list.tracks.splice(i, 1);
            this.helperService.openSnackbar('Track removed Successfully',
              'Okay');
            break;
          }
        }
      });
  }

  clearPlaylist(list: Playlist) {
    this.playlistService.clearPlaylistContent(list.id)
      .subscribe((updatedList: Playlist) => {
        this.helperService.hideModal();
        for (let i = 0; i < this.playlists.length; i++) {
          if (this.playlists[i].id === list.id) {
            this.playlists[i] = updatedList;
            this.playlistService.playlists.next(this.playlists);
            this.helperService.openSnackbar('Playlist cleared Successfully',
              'Okay');
            break;
          }
        }
      });
  }

  deletePlaylist(list: Playlist) {
    this.playlistService.deletePlaylist(list.id)
      .subscribe(() => {
        for (let i = 0; i < this.playlists.length; i++) {
          if (this.playlists[i].id === list.id) {
            this.playlists.splice(i, 1);
            this.playlistService.playlists.next(this.playlists);
            this.helperService.hideModal();
            this.helperService.openSnackbar('Playlist deleted Successfully',
              'Okay');
            break;
          }
        }
      });
  }

  prepareCurrentValue(list: Playlist) {
    this.updatePlaylistDto.name = list.name;
  }


  // controlling playlist details content
  changePlaylist(list: Playlist) {
    this.playlistDetailsComponent.playlist = null;
    setTimeout(() => {
      this.playlistDetailsComponent.playlist = list;
    }, 800);
  }

}
