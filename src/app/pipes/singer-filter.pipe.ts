import {Pipe, PipeTransform} from "@angular/core";
import {Singer} from "../models/media/singer";


@Pipe({
  name: 'singersFilter'
})
export class SingerFilterPipe implements PipeTransform {
  transform(singers: Singer[], searchTerm: string): Singer[] {
    if (!singers || !searchTerm) {
      return singers;
    }
    return singers.filter(singer =>
      singer.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
  }
}
