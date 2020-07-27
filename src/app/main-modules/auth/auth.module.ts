import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../Shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {CustomFormsModule} from 'ngx-custom-validators';
import { GoogleSuccessComponent } from './google-success/google-success.component';
import { GoogleFailureComponent } from './google-failure/google-failure.component';
import { FacebookSuccessComponent } from './facebook-success/facebook-success.component';
import { FacebookFailureComponent } from './facebook-failure/facebook-failure.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent,
    VerifyEmailComponent, ResetPasswordComponent,
    GoogleSuccessComponent, GoogleFailureComponent,
    FacebookSuccessComponent, FacebookFailureComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CustomFormsModule
  ]
})
export class AuthModule { }
