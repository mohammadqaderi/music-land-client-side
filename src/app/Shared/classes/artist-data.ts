import {ArtistType} from "../../commons/enums/artist-type.enum";
import {Gender} from "../../commons/enums/gender.enum";

export class ArtistData {
  artistTypes: ArtistType[] = [
    ArtistType.MUSIC_BAND,
    ArtistType.SINGLE
  ];
  genderTypes: Gender[] = [
    Gender.MALE,
    Gender.FEMALE
  ]
}
