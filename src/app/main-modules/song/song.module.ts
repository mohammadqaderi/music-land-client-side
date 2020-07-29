import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSongsComponent } from './all-songs/all-songs.component';
import {SongRoutingModule} from './song-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../Shared/shared.module';
import {PipesModule} from '../../pipes/pipes.module';



@NgModule({
  declarations: [AllSongsComponent],
  imports: [
    CommonModule,
    SongRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule
  ]
})
export class SongModule { }
