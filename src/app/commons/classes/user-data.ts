import {User} from "../../models/user/user";
import {Profile} from "../../models/user/profile";
import {Favorite} from "../../models/media/favorite";

export class UserData {
  user: User;
  profile: Profile;
  favorite: Favorite;
}
