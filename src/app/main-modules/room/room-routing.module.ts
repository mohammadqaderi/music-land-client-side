import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllRoomsComponent} from './all-rooms/all-rooms.component';
import {RoomDetailsComponent} from './room-details/room-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-rooms',
        component: AllRoomsComponent
      },
      {
        path: ':id',
        component: RoomDetailsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule {

}
