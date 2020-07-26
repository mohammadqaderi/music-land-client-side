import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {Track} from '../../models/media/track';
import {Music} from '../../models/media/music';
import {MusicFilter} from '../../Shared/classes/music-filter';
import {FavoriteService} from '../user/favorite.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  public musics: BehaviorSubject<Music[]> = new BehaviorSubject<Music[]>(null);

  constructor(private http: HttpClient, private favService: FavoriteService) {
    // initialize music subject
    this.getLimitedMusics(8)
      .subscribe(data => {
        this.musics.next(data);
      });
  }

  getAllMusics(): Observable<Music[]> {
    try {
      return this.http.get<Music[]>(ApiEndpoints.MusicEndpoints.allMusics);
    } catch (error) {
      console.error(error);
    }
  }

  getMusicById(id: number): Observable<Music> {
    try {
      return this.http.get<Music>(`${ApiEndpoints.MusicEndpoints.allMusics}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  getLimitedMusics(limit: number): Observable<Music[]> {
    try {
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      return this.http.get<Music[]>(ApiEndpoints.MusicEndpoints.limitedMusics,
        {
          params
        });
    } catch (error) {
      console.error(error);
    }
  }

  getFilteredMusics(musicFilter: MusicFilter): Observable<Music[]> {
    try {
      const {type, limit, rate} = musicFilter;
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      if (type) {
        params = params.append('type', type);
      }
      if (rate) {
        params = params.append('rate', rate.toString());
      }
      return this.http.get<Music[]>(ApiEndpoints.MusicEndpoints.filteredMusics,
        {
          params
        });
    } catch (error) {
      console.error(error);
    }
  }

  pushToPlaylist(musicId: number, playlistId: number): Observable<Track> {
    try {
      const url = `${ApiEndpoints.MusicEndpoints.allMusics}
      /${musicId}/add-to-playlist/${playlistId}`;
      return this.http.post<Track>(url, null);
    } catch (error) {
      console.error(error);
    }
  }

  pushToFavoriteList(musicId: number): Observable<Track> {
    try {
      const url = `${ApiEndpoints.MusicEndpoints.allMusics}
      /${musicId}/save-to-favorite-list/${this.favService.favoriteList.getValue().id}`;
      return this.http.post<Track>(url, null);
    } catch (error) {
      console.error(error);
    }
  }
}
