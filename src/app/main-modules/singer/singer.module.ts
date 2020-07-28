import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllSingersComponent } from './all-singers/all-singers.component';
import {SingerRoutingModule} from './singer-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../Shared/shared.module';
import {PipesModule} from '../../pipes/pipes.module';



@NgModule({
  declarations: [AllSingersComponent],
  imports: [
    CommonModule,
    SingerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule
  ]
})
export class SingerModule { }
