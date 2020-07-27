import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.prepareUserData();
    }
  }

  logout(){
    this.authService.userLogout();
  }


}
