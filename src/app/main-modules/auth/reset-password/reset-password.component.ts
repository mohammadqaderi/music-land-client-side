import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthService} from '../../../services/auth/auth.service';
import {HelperService} from '../../../Shared/services/helper.service';
import {MustMatch} from '../../../Shared/validators/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  private newPasswordToken: string;
  resetPasswordDto: FormGroup;
  submitted = false;
  passwordHide = true;
  confirmHide = true;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private fb: FormBuilder,
              private helperService: HelperService) {
    route.paramMap.subscribe((params: ParamMap) => {
      if ( !params.get('newPasswordToken')) {
        router.navigate(['/home']);
      }
      this.newPasswordToken = params.get('newPasswordToken');
    });
  }

  get controls() {
    return this.resetPasswordDto.controls;
  }

  ngOnInit(): void {
    this.resetPasswordDto = this.fb.group({
      email: new FormControl(null,
        [Validators.required, Validators.email]),
      currentPassword: new FormControl(null),
      newPassword: new FormControl(null, [Validators.required,
      Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      newPasswordToken: new FormControl(this.newPasswordToken)
    }, {
      validator: MustMatch('newPassword','confirmPassword')
    });


  }

  resetWithNewPassword(){
    this.submitted = true;
    if (this.resetPasswordDto.invalid){
      return;
    };
    this.authService.resetPassword(this.resetPasswordDto.value)
      .subscribe(response => {
        if(response){
          this.helperService
            .openSnackbar("You've reset your password successfully",'Okay');
          setTimeout(() =>{
            this.router.navigate(['/auth/login']);
          }, 3500)
        };

      }, error => {
        this.helperService
          .openSnackbar("An unknown error occurred",'Okay');
      })
  }

}
