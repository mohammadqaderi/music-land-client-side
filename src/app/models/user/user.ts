import {Role} from "../../commons/enums/role.enum";
import {Playlist} from "../media/playlist";
import {Message} from "../chat/message";
import {UserJoinedRoom} from "../chat/user-joined-room";

export class User {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Role[];
  isEmailVerified: boolean;
  googleId: string;
  facebookId: string;
  profileId: number;
  subscriberId: number;
  clientId: string;
  userJoinedRooms: UserJoinedRoom[];
  messages: Message[];
  playlists: Playlist[];
}
