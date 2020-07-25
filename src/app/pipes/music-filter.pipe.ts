import {Pipe, PipeTransform} from "@angular/core";
import {Music} from "../models/media/music";


@Pipe({
  name: 'musicsFilter'
})
export class MusicFilterPipe implements PipeTransform {
  transform(musics: Music[], searchTerm: string): Music[] {
    if (!musics || !searchTerm) {
      return musics;
    }
    return musics.filter(music =>
      music.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }
}
