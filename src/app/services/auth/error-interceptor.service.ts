import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {HelperService} from '../../Shared/services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router,
              private helperService: HelperService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        let error = null;
        if ([401].indexOf(err.status) !== -1) {
          // Unauthorized, we will redirect him to login page
          this.helperService.openSnackbar('Login Session has expired', 'OK');
          this.authService.userLogout();
          this.router.navigate(['/auth/login']);
        }
        else if ([403].indexOf(err.status) !== -1) {
          // Forbidden, we will redirect him to login page
          this.helperService.openSnackbar('This Resource is forbidden', 'OK');
          this.router.navigate(['/home'], {
            queryParams:{
              'Error-Status': err.status
            }
          });
        }
        else if (err.status === 404) {
          this.router.navigate(['/resource-not-found', err.status], {
            queryParams: {
              'Error-Status': err.status
            }
          });
        }
        else if(err.status === 500){
          this.router.navigate(['/application-error', err.status], {
            queryParams: {
              'Error-Status': err.status
            }
          });
        }
        error = err.message || err.statusText;
        return throwError(error);
      })
    )
  }

}
