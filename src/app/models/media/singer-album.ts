import { AbstractAlbum } from '../../commons/classes/abstract-album';
import {Song} from "./song";

export class SingerAlbum extends AbstractAlbum {

  songs: Song[];

  singerId: number;
}
