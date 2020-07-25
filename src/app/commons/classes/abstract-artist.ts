import {Gender} from "../enums/gender.enum";

export abstract class AbstractArtist {
  id: number;

  name: string;

  info: string;

  image: string;

  type: any;

  gender: Gender;

  nationality: string;

}
