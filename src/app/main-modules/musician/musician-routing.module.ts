import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllMusiciansComponent} from './all-musicians/all-musicians.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-musicians',
        component: AllMusiciansComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MusicianRoutingModule {

}
