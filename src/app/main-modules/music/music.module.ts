import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMusicsComponent } from './all-musics/all-musics.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MusicRoutingModule} from './music-routing.module';
import {SharedModule} from '../../Shared/shared.module';
import {PipesModule} from '../../pipes/pipes.module';



@NgModule({
  declarations: [AllMusicsComponent],
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
