import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Room} from '../models/chat/room';
import {ApiEndpoints} from '../commons/api-endpoints';
import {AuthService} from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  public rooms: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>(null);
  public connectedUsers: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient ,private authService: AuthService) {
    if(authService.isLoggedIn()){
      this.getAllRooms().subscribe((allRooms: Room[]) => {
        this.rooms.next(allRooms);
      });
    }
  }

  getAllRooms(): Observable<Room[]> {
    try {
      return this.http.get<Room[]>(ApiEndpoints.RoomEndpoints.rootRooms);
    } catch (error) {
      console.error(error);
    }
  }

  getRoomById(id: number): Observable<Room> {
    try {
      return this.http.get<Room>(`${ApiEndpoints.RoomEndpoints.rootRooms}/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  createNewRoom(createRoomDto): Observable<Room> {
    try {
      return this.http.post<Room>(ApiEndpoints.RoomEndpoints.rootRooms, createRoomDto);
    } catch (error) {
      console.error(error);
    }
  }

  updateRoom(id: number, updateRoomDto): Observable<Room> {
    try {
      return this.http.put<Room>(`${ApiEndpoints.RoomEndpoints.rootRooms}/${id}/edit-room`, updateRoomDto);
    } catch (error) {
      console.error(error);
    }
  }

  deleteRoom(id: number): Observable<any> {
    try {
      return this.http.delete<any>(`${ApiEndpoints.RoomEndpoints.rootRooms}/${id}/delete-room`);
    } catch (error) {
      console.error(error);
    }
  }


  getUserRooms(): Observable<Room[]> {
    try {
      return this.http.get<Room[]>(ApiEndpoints.RoomEndpoints.userRooms);
    } catch (error) {
      console.error(error);
    }
  }
}
