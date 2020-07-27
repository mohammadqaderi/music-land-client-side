import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user/user';
import {CookieService} from 'ngx-cookie-service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  isUsernameExist = false;

  @ViewChild('usernameField', {static: true}) usernameField: ElementRef;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private cookieService: CookieService) {
    if (authService.isLoggedIn()) {
      router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      authCredentialsDto: new FormGroup({
        username: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required,
          Validators.email])
      }),
      createProfileDto: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        gender: new FormControl(null, Validators.required),
        age: new FormControl(null, Validators.required),
        phone: new FormControl(null, Validators.required),
        country: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
      })
    });
    fromEvent(this.usernameField.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value
        }),
        debounceTime(1000)
        ,distinctUntilChanged()
      ).subscribe((username: string) => {
        this.authService.checkUserName(username)
          .subscribe((isExistRes: boolean) => {
            this.isUsernameExist = isExistRes
          })
    })
  }

  get email() {
    return this.registrationForm.get('authCredentialsDto').get('email');
  }

  get password() {
    return this.registrationForm.get('authCredentialsDto').get('password');
  }

  register() {
    const emailLoginDto = {
      email: this.email.value,
      password: this.password.value
    };
    this.authService.registerUser(this.registrationForm.value)
      .subscribe(() => {
        this.authService.login(emailLoginDto)
          .subscribe((data: { accessToken: string, user: User }) => {
            this.cookieService.set('token', data.accessToken);
            this.cookieService.set('user', JSON.stringify(data.user));
            this.authService.prepareUserData();
            this.router.navigate(['/home']);
          });
      });
  }


}
