import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import {RoomRoutingModule} from './room-routing.module';
import {SharedModule} from '../../Shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [AllRoomsComponent, RoomDetailsComponent],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoomModule { }
