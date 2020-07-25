import {SongType} from "../../commons/enums/song-type.enum";
import {SongLanguage} from "../../commons/enums/song-language.enum";

export class SongFilter {
  limit: number;
  type: SongType;
  language: SongLanguage;
  rate: number;
}
