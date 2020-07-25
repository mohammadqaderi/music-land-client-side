import {Pipe, PipeTransform} from "@angular/core";
import {Song} from "../models/media/song";


@Pipe({
  name: 'songsFilter'
})
export class SongFilterPipe implements PipeTransform {
  transform(songs: Song[], searchTerm: string): Song[] {
    if (!songs || !searchTerm) {
      return songs;
    }
    return songs.filter(song =>
      song.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }
}
