import { AbstractAlbum } from '../../commons/classes/abstract-album';
import {Music} from "./music";

export class MusicianAlbum extends AbstractAlbum{

  musicianId: number;

  musics: Music[];
}
