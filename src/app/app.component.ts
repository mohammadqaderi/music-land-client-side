import {Component, OnInit} from '@angular/core';
import {AuthService} from './services/auth/auth.service';
import {Socket} from 'ngx-socket-io';
import {RoomService} from './services/room.service';
import {HelperService} from './Shared/services/helper.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService,
              private roomService: RoomService,
              private socket: Socket) {

  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.prepareUserData();
    }
    this.socket.on('connected-users', data => {
      this.roomService.connectedUsers.next(data);
    });

  }


}
