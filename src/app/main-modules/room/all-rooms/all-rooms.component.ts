import {Component, OnInit} from '@angular/core';
import {Room} from '../../../models/chat/room';
import {RoomService} from '../../../services/room.service';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {HelperService} from '../../../Shared/services/helper.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  rooms: Room[];
  createRoomDto = {
    name: null
  };
  updateRoomDto = {
    name: null
  };

  constructor(public roomService: RoomService,
              private router: Router,
              private authService: AuthService,
              public helperService: HelperService) {
  }

  ngOnInit(): void {
    this.roomService.rooms.subscribe((allRooms: Room[]) => {
      this.rooms = allRooms;
    });
  }

  navigateToRoom(room: Room) {
    this.router.navigate(['rooms', room.id], {
      queryParams: {
        name: room.name
      }
    });
  }

  isCreatedByYou(room: Room): boolean{
    return room.createdBy === localStorage.getItem('username')
  }

  createNewRoom() {
    this.roomService.createNewRoom(this.createRoomDto)
      .subscribe((room: Room) => {
        this.rooms.push(room);
        this.roomService.rooms.next(this.rooms);
        this.helperService.openSnackbar(
          'Room created successfully',
          'Okay'
        );
        this.createRoomDto.name = null;
      });
  }

  prepareUpdateObject(roomName: string){
    this.updateRoomDto.name = roomName;
  }

  removeRoom(room: Room) {
    this.roomService.deleteRoom(room.id)
      .subscribe(() => {
        this.helperService.hideModal();
        for (let i = 0; i < this.rooms.length; i++) {
          if (this.rooms[i].id === room.id) {
            this.helperService.openSnackbar(
              `Room ${room.name} Deleted successfully`,
              'Okay'
            );
            this.rooms.splice(i, 1);
            this.roomService.rooms.next(this.rooms);
          }
        }
      });
  }

  updateRoom(room: Room) {
    this.roomService.updateRoom(room.id, this.updateRoomDto)
      .subscribe((updatedRoom: Room) => {
        this.helperService.hideModal();
        for (let i = 0; i < this.rooms.length; i++) {
          if (this.rooms[i].id === room.id) {
            this.helperService.openSnackbar(
              `Room ${room.name} Updated successfully`,
              'Okay'
            );
            this.rooms[i] = updatedRoom;
            this.roomService.rooms.next(this.rooms);
          }
        }
      });
  }

}
