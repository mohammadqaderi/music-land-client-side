import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {Playlist} from '../../models/media/playlist';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  public playlists: BehaviorSubject<Playlist[]> = new BehaviorSubject<Playlist[]>(null);
  constructor(private http: HttpClient, private authService: AuthService) {
    this.getAllUserPlaylists().subscribe((userPlaylists: Playlist[]) =>{
      this.playlists.next(userPlaylists);
    })
  }

  getAllUserPlaylists(): Observable<Playlist[]> {
    try {
      return this.http.get<Playlist[]>(ApiEndpoints.PlaylistEndpoints.userPlaylists);
    } catch (error) {
      console.error(error);
    }
  }

  getCurrentPlaylists(): Playlist[] {
    return this.playlists.getValue();
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
        < Playlist > (`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}/${id}/update-playlist`, playlistDto);
    } catch (error) {
      console.error(error);
    }
  }

  deletePlaylist(id: number): Observable<any> {
    try {
      return this.http.delete
      (`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}/${id}/delete-playlist`);
    } catch (error) {
      console.error(error);
    }
  }

  clearPlaylistContent(id: number): Observable<Playlist> {
    try {
      return this.http.delete<Playlist>(`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}/${id}/clear-playlist`);
    } catch (error) {
      console.error(error);
    }
  }

  removeTrackFromPlaylist(playlistId: number, trackId: number): Observable<Playlist> {
    try {
      return this.http.delete<Playlist>(`${ApiEndpoints.PlaylistEndpoints.rootPlaylist}/${playlistId}/remove-track-from-playlist/${trackId}`);
    } catch (error) {
      console.error(error);
    }
  }
}
