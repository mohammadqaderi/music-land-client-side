import {SongType} from "../../commons/enums/song-type.enum";
import {SongLanguage} from "../../commons/enums/song-language.enum";

export class SongData {
  songTypes = [
    SongType.ROCK,
    SongType.POP,
    SongType.BALLADS,
    SongType.CLASSICAL,
    SongType.COUNTRY,
    SongType.LOVE,
    SongType.METAL,
    SongType.DANCE,
    SongType.GOSPEL,
    SongType.HIP_HOP,
  ];
  songLanguages = [
    SongLanguage.ENGLISH,
    SongLanguage.ARABIC,
    SongLanguage.ITALIC,
    SongLanguage.TURKISH,
    SongLanguage.SPANISH,
    SongLanguage.FRANCE,
    SongLanguage.LATINA
  ];
}
