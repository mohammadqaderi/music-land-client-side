import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMusicsComponent } from './all-musics/all-musics.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MusicRoutingModule} from './music-routing.module';
import {SharedModule} from '../../Shared/shared.module';
import {PipesModule} from '../../pipes/pipes.module';
import { MusicDetailsComponent } from './music-details/music-details.component';



@NgModule({
  declarations: [AllMusicsComponent, MusicDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MusicRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule
  ]
})
export class MusicModule { }
