import { AbstractArtist } from '../../commons/classes/abstract-artist';
import {SingerAlbum} from "./singer-album";
export class Singer extends AbstractArtist {
  singerAlbums: SingerAlbum[];
}
