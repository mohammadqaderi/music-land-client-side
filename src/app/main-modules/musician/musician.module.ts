import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMusiciansComponent } from './all-musicians/all-musicians.component';
import {MusicianRoutingModule} from './musician-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../Shared/shared.module';
import {PipesModule} from '../../pipes/pipes.module';



@NgModule({
  declarations: [AllMusiciansComponent],
  imports: [
    CommonModule,
    MusicianRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule
  ]
})
export class MusicianModule { }
