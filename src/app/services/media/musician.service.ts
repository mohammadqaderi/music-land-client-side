import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {ArtistFilter} from '../../Shared/classes/artist-filter';
import {Musician} from '../../models/media/musician';

@Injectable({
  providedIn: 'root'
})
export class MusicianService {

  public musicians: BehaviorSubject<Musician[]> =
    new BehaviorSubject<Musician[]>(null);

  constructor(private http: HttpClient) {
    // initialize musicians subject
    this.getLimitedMusicians(8)
      .subscribe(data => {
        this.musicians.next(data);
      });
  }

  getAllMusicians(): Observable<Musician[]> {
    try {
      return this.http.get<Musician[]>(ApiEndpoints.MusicianEndpoints.allMusicians);
    } catch (error) {
      console.error(error);
    }
  }

  getMusicianById(id: number): Observable<Musician> {
    try {
      return this.http.get<Musician>(
        `${ApiEndpoints.MusicianEndpoints.allMusicians}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  getLimitedMusicians(limit: number): Observable<Musician[]> {
    try {
      let params = new HttpParams();
      if (limit) {
        params = params.append('limit', limit.toString());
      }
      return this.http.get<Musician[]>(ApiEndpoints.MusicianEndpoints.limitedMusicians,
        {
          params
        });
    } catch (error) {
      console.error(error);
    }
  }

  getFilteredMusicians(musicianFilter: ArtistFilter): Observable<Musician[]> {
    try {
      const {type, gender, limit, nationality} = musicianFilter;
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
      return this.http.get<Musician[]>(ApiEndpoints.MusicianEndpoints.filteredMusicians,
        {
          params
        });
    } catch (error) {
      console.error(error);
    }
  }
}
