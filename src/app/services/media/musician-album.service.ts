import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {MusicianAlbum} from '../../models/media/musician-album';

@Injectable({
  providedIn: 'root'
})
export class MusicianAlbumService {

  constructor(private http: HttpClient) {
  }

  getAllMusiciansAlbums(): Observable<MusicianAlbum[]> {
    try {
      return this.http.get<MusicianAlbum[]>
      (ApiEndpoints.MusiciansAlbumsEndpoints.allMusiciansAlbums);
    } catch (error) {
      console.error(error);
    }
  }
  getMusicianAlbumById(id: number): Observable<MusicianAlbum> {
    try {
      return this.http.get<MusicianAlbum>(
        `${ApiEndpoints.MusiciansAlbumsEndpoints.allMusiciansAlbums}/${id}`
      );
    } catch (error) {
      console.error(error);
    }
  }}
