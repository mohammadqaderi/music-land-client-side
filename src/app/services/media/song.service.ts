import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Song} from '../../models/media/song';
import {SongFilter} from '../../Shared/classes/song-filter';
import {Track} from '../../models/media/track';
import {FavoriteService} from '../user/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  public songs: BehaviorSubject<Song[]> = new BehaviorSubject<Song[]>(null);

  constructor(private http: HttpClient, private favService: FavoriteService) {
    // initialize song subject
    this.getLimitedSongs(8)
      .subscribe(data => {
        this.songs.next(data);
      });
  }

  getAllSongs(): Observable<Song[]> {
    try {
      return this.http.get<Song[]>(ApiEndpoints.SongEndpoints.allSongs);
    } catch (error) {
      console.error(error);
    }
  }

  getSongById(id: number): Observable<Song> {
    try {
      return this.http.get<Song>(`${ApiEndpoints.SongEndpoints.allSongs}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  getLimitedSongs(limit: number): Observable<Song[]> {
    try {
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      return this.http.get<Song[]>(ApiEndpoints.SongEndpoints.limitedSongs,
        {
          params
        });
    } catch (error) {
      console.error(error);
    }
  }

  getFilteredSongs(songFilter: SongFilter): Observable<Song[]> {
    try {
      const {type, language, limit, rate} = songFilter;
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      if (language) {
        params = params.append('language', language);
      }
      if (type) {
        params = params.append('type', type);
      }
      if (rate) {
        params = params.append('rate', rate.toString());
      }
      return this.http.get<Song[]>(ApiEndpoints.SongEndpoints.filteredSongs,
        {
          params
        });
    } catch (error) {
      console.error(error);
    }
  }

  pushToPlaylist(songId: number, playlistId: number): Observable<Track> {
    try {
      const url = `${ApiEndpoints.SongEndpoints.allSongs}/${songId}/add-to-playlist/${playlistId}`;
      return this.http.post<Track>(url, null);
    } catch (error) {
      console.error(error);
    }
  }

  pushToFavoriteList(songId: number, favoriteListId: number): Observable<Track> {
    try {
      const url = `${ApiEndpoints.SongEndpoints.allSongs}/${songId}/save-to-favorite-list/${favoriteListId}`;
      return this.http.post<Track>(url, null);
    } catch (error) {
      console.error(error);
    }
  }
}
