import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {Observable} from 'rxjs';
import {Playlist} from '../../models/media/playlist';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getAllUserPlaylists(): Observable<Playlist[]> {
    try {
      return this.http.get<Playlist[]>(ApiEndpoints.PlaylistEndpoints.userPlaylists);
    } catch (error) {
      console.error(error);
    }
  }

  getCurrentPlaylists(): Playlist[] {
    try {
      if(this.authService.isLoggedIn()){
        return this.authService.currentUser.getValue().playlists;
      }
    } catch (error) {
      console.error(error);
    }
  }

  getPlaylistById(id: number): Observable<Playlist> {
    try {
      return this.http.get
        < Playlist > (`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  createNewPlaylist(playlistDto: any): Observable<Playlist> {
    try {
      return this.http.post
        < Playlist > (ApiEndpoints.PlaylistEndpoints.newPlaylist, playlistDto);
    } catch (error) {
      console.error(error);
    }
  }

  updatePlaylist(id: number, playlistDto: any): Observable<Playlist> {
    try {
      return this.http.put
        < Playlist > (`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}
        /${id}/update-playlist`, playlistDto);
    } catch (error) {
      console.error(error);
    }
  }

  deletePlaylist(id: number): Observable<any> {
    try {
      return this.http.delete
      (`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}
        /${id}/delete-playlist`);
    } catch (error) {
      console.error(error);
    }
  }

  clearPlaylistContent(id: number): Observable<Playlist> {
    try {
      return this.http.delete<Playlist>(`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}
     /${id}/clear-playlist`);
    } catch (error) {
      console.error(error);
    }
  }

  removeTrackFromPlaylist(playlistId: number, trackId: number): Observable<Playlist> {
    try {
      return this.http.delete<Playlist>(`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}
     /${playlistId}/remove-track-from-playlist/${trackId}`);
    } catch (error) {
      console.error(error);
    }
  }
}
