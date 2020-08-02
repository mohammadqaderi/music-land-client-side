import {Message} from './message';
import {UserJoinedRoom} from './user-joined-room';

export class Room  {
  id: number;

  name: string;

  createdAt: Date;

  createdBy: string;


  messages: Message[];

  userJoinedRooms: UserJoinedRoom[];
}
