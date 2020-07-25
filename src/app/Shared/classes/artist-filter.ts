import {ArtistType} from "../../commons/enums/artist-type.enum";
import {Gender} from "../../commons/enums/gender.enum";

export class ArtistFilter {
  limit: number;
  type: ArtistType;
  nationality: string;
  gender: Gender;
}
