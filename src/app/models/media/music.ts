import {AbstractMusic} from "../../commons/classes/abstract-music";
import {MusicType} from "../../commons/enums/music-type.enum";
import {Track} from "./track";


export class Music extends AbstractMusic {


  type: MusicType;

  tracks: Track[];

  musicianAlbumId: number
}
