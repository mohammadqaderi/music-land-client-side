import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../services/auth/auth.service';
import {Route, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../../models/user/user';
import {HelperService} from '../../../Shared/services/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailLoginDto: FormGroup;
  parentModalRef: BsModalRef;
  isSent: boolean = false;
  email: string = null;
  message: string = null;
  @ViewChild('invalidCredentials', {static: true}) invalidCredentials: TemplateRef<any>;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private modalService: BsModalService,
              private dialog: MatDialog,
              private helperService: HelperService) {
    if (authService.isLoggedIn()) {
      router.navigate(['/home']);
    }
  }

  userLogin() {
    this.authService.login(this.emailLoginDto.value)
      .subscribe((data: { accessToken: string, user: User }) => {
        localStorage.setItem('token', data.accessToken);
        this.authService.prepareUserData();
        this.router.navigate(['/home']);
      }, (error: any) => {
        console.log(error);
        this.openModal(this.invalidCredentials);
      });
  }


  ngOnInit(): void {
    this.emailLoginDto = this.fb.group({
      email: new FormControl(null,
        [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  openDialog(template: TemplateRef<any>) {
    this.helperService.openDialog(template);
  }

  hideDialog() {
    this.helperService.hideDialog();
  }

  openModal(template: TemplateRef<any>) {
    this.parentModalRef = this.modalService.show(template);
  }

  sendEmailForgotPassword() {
    this.helperService.showSpinner();
    this.authService.forgotPassword(this.email)
      .subscribe(result => {
        this.message = `Your Request has been sent successfully, please checkout
         your Gmail inbox to confirm your request and reset your password`;
        this.isSent = true;
        this.helperService.hideSpinner();
      });
  }


}
