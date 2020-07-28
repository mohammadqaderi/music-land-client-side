import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {HelperService} from '../../../Shared/services/helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('requestResult', {static: true}) requestResult: TemplateRef<any>;

  constructor(public authService: AuthService,
              public helperService: HelperService) {
  }

  ngOnInit(): void {
    this.authService.currentUser.next(
      JSON.parse(localStorage.getItem('user'))
    );
  }

  isAccountVerified(): boolean {
    return this.authService.currentUser.getValue().isEmailVerified;
  }

  sendAccountVerification() {
    this.authService.sendEmailVerification(this.authService.currentUser.getValue().email)
      .subscribe(() => this.helperService.openModal(this.requestResult));
  }


}
