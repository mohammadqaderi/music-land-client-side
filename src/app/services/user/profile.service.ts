import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Profile} from '../../models/user/profile';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  getUserProfile(): Observable<Profile> {
    try {
      return this.http.get<Profile>(ApiEndpoints.ProfileEndpoints.userProfile);
    } catch (error) {
      console.error(error);
    }
  }


  uploadProfileImage(imageForm: FormData): Observable<Profile> {
    try {
      return this.http.post<Profile>(ApiEndpoints.ProfileEndpoints.setProfileImage,
        imageForm);
    } catch (error) {
      console.error(error);
    }
  }

  changeProfileImage(imageForm: FormData): Observable<Profile> {
    try {
      return this.http.patch<Profile>(ApiEndpoints.ProfileEndpoints.changeProfileImage,
        imageForm);
    } catch (error) {
      console.error(error);
    }
  }

  deleteProfileImage(): Observable<Profile> {
    try {
      return this.http.delete<Profile>(ApiEndpoints.ProfileEndpoints.deleteProfileImage);
    } catch (error) {
      console.error(error);
    }
  }
  editUserProfile(createProfileDto: any): Observable<Profile> {
    try {
      return this.http.put<Profile>(ApiEndpoints.ProfileEndpoints.editProfile,
        createProfileDto);
    } catch (error) {
      console.error(error);
    }
  }


}
