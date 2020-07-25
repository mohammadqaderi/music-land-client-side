import {Track} from "./track";

export class Playlist {
  id: number;

  name: string;

  createdAt: Date;

  tracks: Track[];

  userId: number
}
