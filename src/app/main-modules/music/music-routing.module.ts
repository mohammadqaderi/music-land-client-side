import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllMusicsComponent} from './all-musics/all-musics.component';
import {MusicDetailsComponent} from './music-details/music-details.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-musics',
        component: AllMusicsComponent
      },
      {
        path: ':id',
        component: MusicDetailsComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicRoutingModule {

}
