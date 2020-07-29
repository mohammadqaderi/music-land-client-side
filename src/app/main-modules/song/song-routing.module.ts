import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllSongsComponent} from './all-songs/all-songs.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-songs',
        component: AllSongsComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongRoutingModule {

}
