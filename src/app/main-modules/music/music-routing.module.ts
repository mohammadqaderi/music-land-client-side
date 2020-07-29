import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllMusicsComponent} from './all-musics/all-musics.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-musics',
        component: AllMusicsComponent
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
