import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HelperService} from '../../../Shared/services/helper.service';

@Component({
  selector: 'app-facebook-success',
  templateUrl: './facebook-success.component.html',
  styleUrls: ['./facebook-success.component.css']
})
export class FacebookSuccessComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private helperService: HelperService) {
    if (authService.isLoggedIn()) {
      router.navigate(['/home']);
    }
    route.paramMap.subscribe((params: ParamMap) => {
      if (params.get('userId') && params.get('accessToken')) {
        localStorage.setItem('token', params.get('accessToken').substring(12));
        setTimeout(() => {
            authService.prepareUserData();
            router.navigate(['/home']);
        }, 2500);
      }
    });

  }

  ngOnInit(): void {
    this.helperService.showSpinner();
  }

}
