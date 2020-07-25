import {Pipe, PipeTransform} from "@angular/core";
import {Musician} from "../models/media/musician";


@Pipe({
  name: 'musicianFilter'
})
export class MusicianFilterPipe implements PipeTransform {
  transform(musicians: Musician[], searchTerm: string): Musician[] {
    if (!musicians || !searchTerm) {
      return musicians;
    }
    return musicians.filter(musician =>
      musician.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }
}
