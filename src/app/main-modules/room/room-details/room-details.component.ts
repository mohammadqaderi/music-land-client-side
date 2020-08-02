import {Component, OnDestroy, OnInit} from '@angular/core';
import {Message} from '../../../models/chat/message';
import {Room} from '../../../models/chat/room';
import {Subscription} from 'rxjs';
import {RoomService} from '../../../services/room.service';
import {HelperService} from '../../../Shared/services/helper.service';
import {Socket} from 'ngx-socket-io';
import {AuthService} from '../../../services/auth/auth.service';
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css']
})
export class RoomDetailsComponent implements OnInit, OnDestroy {

  messages: Message[] = [];
  message = null;
  room: Room;

  subscription: Subscription;

  constructor(private roomService: RoomService,
              private helperService: HelperService,
              private socket: Socket,
              private authService: AuthService,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const roomId = +params.get('id');
      this.socket.emit('enter-chat-room', {
        nickname: this.Nickname,
        roomId
      });
      this.roomService.getRoomById(roomId).subscribe((room: Room) => {
        this.room = room;
        this.messages = room.messages;
      });
    });

    this.socket.on('message', message => {
      this.messages.push(message);
    });

    this.socket.on('users-changed', data => {
      const {user} = data;
      if (data['event'] === 'left') {
        this.helperService.openSnackbar(
          `User ${user} Left Room`,
          'Okay'
        );
      } else if (data['event'] === 'joined') {
        this.helperService.openSnackbar(
          `User ${user} Joined Room`,
          'Okay'
        );
      }
    });
  }

  get UserId() {
    return +localStorage.getItem('userId');
  }

  get Nickname() {
    return localStorage.getItem('nickname');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.socket.removeAllListeners('message');
    this.socket.removeAllListeners('users-changed');
    this.socket.emit('leave-room', {
      nickname: this.Nickname,
      roomId: this.room.id
    });

  }

  sendMessage() {
    this.socket.emit('add-message', {
      text: this.message,
      roomId: this.room.id,
      userId: this.UserId
    });
    this.message = null;
  }


}
