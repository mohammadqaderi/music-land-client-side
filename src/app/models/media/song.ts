import { AbstractMusic } from '../../commons/classes/abstract-music';
import { SongType } from '../../commons/enums/song-type.enum';
import { SongLanguage } from '../../commons/enums/song-language.enum';
import {Track} from "./track";

export class Song extends AbstractMusic{

  type: SongType;


  language: SongLanguage;


  tracks: Track[];


  singerAlbumId: number;
}
