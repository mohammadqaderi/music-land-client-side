import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Favorite} from '../../models/media/favorite';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http: HttpClient) {
  }

  public favoriteList: BehaviorSubject<Favorite> = new BehaviorSubject<Favorite>(null);
  getUserFavoriteList(id: number): Observable<Favorite> {
    try {
      return this.http.get
        <Favorite>(`${ApiEndpoints.FavoriteListEndpoints.userFavoriteList}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  clearFavoriteListContent(id: number): Observable<Favorite>{
    try {
      return this.http.delete
        <Favorite>(`${ApiEndpoints.FavoriteListEndpoints.userFavoriteList}/${id}/clear-favorite-list`);
    } catch (error) {
      console.error(error);
    }
  }

  removeTrackFavoriteList(favoriteId: number, trackId: number): Observable<void>{
    try {
      return this.http.delete<void>
        (`${ApiEndpoints.FavoriteListEndpoints.userFavoriteList}/${favoriteId}/remove-track-from-favorite-list/${trackId}`);
    } catch (error) {
      console.error(error);
    }
  }

  get FavoriteListId() {
    return +localStorage.getItem('favoriteListId');
  }
}
