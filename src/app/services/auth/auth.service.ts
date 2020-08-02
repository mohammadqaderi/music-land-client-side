import {Injectable} from '@angular/core';
import {Profile} from '../../models/user/profile';
import {User} from '../../models/user/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';
import {SubscribersNotifications} from '../../models/notification/models/subscribers-notification';
import {Subscriber} from '../../models/notification/models/subscriber';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: string;
  public profile: BehaviorSubject<Profile> = new BehaviorSubject<Profile>(null);
  public currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public subscriberNotifications: BehaviorSubject<SubscribersNotifications[]>
    = new BehaviorSubject<SubscribersNotifications[]>([]);

  constructor(private http: HttpClient,
              private router: Router) {
  }


  // registration
  registerUser(registrationInfo): Observable<void> {
    try {
      return this.http.post<void>(ApiEndpoints.AuthEndpoints.register, registrationInfo);
    } catch (error) {
      console.error(error);
    }
  }

  // user data

  prepareUserData() {
    this.pUserData().subscribe((uData: any) => {
      this.currentUser.next(uData.user);
      this.profile.next(uData.profile);
      if (localStorage.length < 2) {
        localStorage.setItem('user', uData.user);
        localStorage.setItem('userId', uData.user.id.toString());
        localStorage.setItem('favoriteListId', uData.favorite.id.toString());
        localStorage.setItem('username',
          `${uData.profile.firstName} ${uData.profile.lastName}`);
        localStorage.setItem('nickname', uData.user.username);
      }
    });
  }

  pUserData() {
    try {
      return this.http.get(ApiEndpoints.AuthEndpoints.userMainData);
    } catch (error) {
      console.error(error);
    }
  }

  // just for validating user name for register users
  checkUserName(username: string): Observable<boolean> {
    try {
      return this.http.get<boolean>(`${ApiEndpoints.AuthEndpoints.checkUserName}/${username}`);
    } catch (error) {
      console.error(error);
    }
  }

  login(authCredentialsDto: any): Observable<{ accessToken: string, user: User }> {
    try {
      return this.http.post<{ accessToken: string, user: User }>
      (ApiEndpoints.AuthEndpoints.loginUser, authCredentialsDto);
    } catch (error) {
      console.error(error);
    }
  }

  // verify user email

  sendEmailVerification(email: string) {
    try {
      const url = `${ApiEndpoints.AuthEndpoints.sendEmailVerification}/${email}`;
      return this.http.get(url);
    } catch (error) {
      console.error(error);
    }
  }

  verifyEmail(token: string): Observable<{ isFullyVerified: boolean, user: User }> {
    try {
      const url = `${ApiEndpoints.AuthEndpoints.emailVerify}/${token}`;
      return this.http.get<{ isFullyVerified: boolean, user: User }>(url);
    } catch (error) {
      console.error(error);
    }
  }

  // for forgotten password

  forgotPassword(email: string) {
    try {
      const url = `${ApiEndpoints.AuthEndpoints.emailForgotPassword}/${email}`;
      return this.http.get(url);
    } catch (error) {
      console.error(error);
    }
  }

  resetPassword(resetPasswordDto: any) {
    try {
      return this.http.post(ApiEndpoints.AuthEndpoints.emailResetPassword,
        resetPasswordDto);
    } catch (error) {
      console.error(error);
    }
  }

  userLogout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn() {
    return localStorage.getItem('token') &&
      localStorage.getItem('userId');
  }

  getToken() {
    return localStorage.getItem('token');
  }



  getUserById(id: number): Observable<User> {
    try {
      return this.http.get<User>(`${ApiEndpoints.AuthEndpoints.users}/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  // show alert to the user if his account is not verified yet.
  showAccountVerificationAlert() {
    return this.isLoggedIn() && this.currentUser &&
      !this.currentUser.getValue().isEmailVerified;
  }

}
