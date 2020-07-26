import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HelperService} from '../../../Shared/services/helper.service';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../models/user/user';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  private token: string = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private helperService: HelperService) {
    route.paramMap.subscribe((params: ParamMap) => {
      if (authService.isLoggedIn() && !params.get('emailToken')) {
        router.navigate(['/home']);
      }
      if (!authService.isLoggedIn()) {
        router.navigate(['/auth/login']);

      }
      this.token = params.get('emailToken');
    });
  }

  ngOnInit(): void {
  }

  verifyEmail() {
    this.authService.verifyEmail(this.token)
      .subscribe((res: { isFullyVerified: boolean, user: User }) => {
        if (res.isFullyVerified) {
          this.authService.currentUser = res.user;
          this.helperService.openSnackbar('Your Email is fully verified',
            'Good');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 2000);
        }
      });
  }
}
