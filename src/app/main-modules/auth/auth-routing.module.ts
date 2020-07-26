import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {VerifyEmailComponent} from './verify-email/verify-email.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

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
