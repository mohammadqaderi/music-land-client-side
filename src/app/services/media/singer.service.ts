import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Singer} from '../../models/media/singer';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {ArtistFilter} from '../../Shared/classes/artist-filter';

@Injectable({
  providedIn: 'root'
})
export class SingerService {

  public singers: BehaviorSubject<Singer[]> = new BehaviorSubject<Singer[]>(null);

  constructor(private http: HttpClient) {
    // initialize singers subject
    this.getLimitedSingers(8)
      .subscribe(data => {
        this.singers.next(data);
      });
  }

  getAllSingers(): Observable<Singer[]> {
    try {
      return this.http.get<Singer[]>(ApiEndpoints.SingersEndpoints.allSingers);
    } catch (error) {
      console.error(error);
    }
  }

  getSingerById(id: number): Observable<Singer> {
    try {
      return this.http.get<Singer>(`${ApiEndpoints.SingersEndpoints.allSingers}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  getLimitedSingers(limit: number): Observable<Singer[]> {
    try {
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      return this.http.get<Singer[]>(ApiEndpoints.SingersEndpoints.limitedSingers,
        {
          params
        });
    } catch (error) {
      console.error(error);
    }
  }

  getFilteredSingers(singerFilter: ArtistFilter): Observable<Singer[]> {
    try {
      const {type, gender, limit, nationality} = singerFilter;
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      if (nationality) {
        params = params.append('nationality', nationality);
      }
      if (type) {
        params = params.append('type', type);
      }
      if (gender && type as unknown as string !== 'MUSIC_BAND') {
        params = params.append('gender', gender);
      }
      return this.http.get<Singer[]>(ApiEndpoints.SingersEndpoints.filteredSingers,
        {
          params
        });
    } catch (error) {
      console.error(error);
    }
  }
}
