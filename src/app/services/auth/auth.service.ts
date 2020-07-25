import {Injectable} from '@angular/core';
import {Profile} from '../../models/user/profile';
import {User} from '../../models/user/user';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {ApiEndpoints} from '../../commons/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public username: string;
  public profile: Profile;
  public currentUser: User;

  constructor(private http: HttpClient,
              private router: Router,
              private cookieService: CookieService) {
  }

  /*
  *
   try {

    }catch (error) {
      console.error(error);
    }
  * */

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
      this.currentUser = uData.user;
      this.profile = uData.profile;

      // we will prepare favorite behavior subject later
      this.username = `${uData.profile.firstName} ${uData.profile.lastName}`;
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
      return this.http.post<boolean>(ApiEndpoints.AuthEndpoints.checkUserName, {username});
    } catch (error) {
      console.error(error);
    }
  }

  login(authCredentialsDto: any) {
    try {
      this.http.post(ApiEndpoints.AuthEndpoints.loginUser, authCredentialsDto);
    } catch (error) {
      console.error(error);
    }
  }

  // verify user email

  sendEmailVerification(email: string) {
    try {
      const url = `${ApiEndpoints.AuthEndpoints.sendEmailVerification}/${email}`;
      this.http.get(url);
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
    this.cookieService.delete('token');
    this.cookieService.delete('user');
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn() {
    return this.cookieService.check('token')
      && this.cookieService.check('user');
  }

  getToken() {
    return this.cookieService.get('token');
  }

  // show alert to the user if his account is not verified yet.
  showAccountVerificationAlert() {
    return this.isLoggedIn() && this.currentUser && !this.currentUser.isEmailVerified;
  }

}
