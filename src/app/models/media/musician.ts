import { AbstractArtist } from '../../commons/classes/abstract-artist';
import {MusicianAlbum} from "./musician-album";

export class Musician extends AbstractArtist{

  musicianAlbums: MusicianAlbum[];
}
