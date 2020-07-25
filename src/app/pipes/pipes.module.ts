import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SingerFilterPipe} from "./singer-filter.pipe";
import {SongFilterPipe} from "./song-filter.pipe";
import {MusicianFilterPipe} from "./musician-filter.pipe";
import {MusicFilterPipe} from "./music-filter.pipe";

@NgModule({
  declarations: [SingerFilterPipe, SongFilterPipe, MusicianFilterPipe, MusicFilterPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    SingerFilterPipe,
    SongFilterPipe,
    MusicianFilterPipe,
    MusicFilterPipe
  ]
})
export class PipesModule {
}
