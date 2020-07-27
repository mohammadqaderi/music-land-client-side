import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {GoogleSuccessComponent} from './google-success/google-success.component';
import {GoogleFailureComponent} from './google-failure/google-failure.component';
import {FacebookSuccessComponent} from './facebook-success/facebook-success.component';
import {FacebookFailureComponent} from './facebook-failure/facebook-failure.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'google-success/:userId/:accessToken',
        component: GoogleSuccessComponent
      },
      {
        path: 'google-failure',
        component: GoogleFailureComponent
      },
      {
        path: 'facebook-success/:userId/:accessToken',
        component: FacebookSuccessComponent
      },
      {
        path: 'facebook-failure',
        component: FacebookFailureComponent
      },
      {
        path: 'verify-email/:emailToken',
        component: VerifyEmailComponent
      },
      {
        path: 'reset-password/:newPasswordToken',
        component: ResetPasswordComponent
      },
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
