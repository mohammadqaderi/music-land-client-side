import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SingerAlbum} from '../../models/media/singer-album';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SingerAlbumService {

  constructor(private http: HttpClient) {
  }

  getAllSingersAlbums(): Observable<SingerAlbum[]> {
    try {
      return this.http.get<SingerAlbum[]>(ApiEndpoints.SingersAlbumsEndpoints.allSingersAlbums);
    } catch (error) {
      console.error(error);
    }
  }
  getSingerAlbumById(id: number): Observable<SingerAlbum> {
    try {
      return this.http.get<SingerAlbum>(
        `${ApiEndpoints.SingersAlbumsEndpoints.allSingersAlbums}/${id}`
      );
    } catch (error) {
      console.error(error);
    }
  }
}
