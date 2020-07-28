import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllSingersComponent} from './all-singers/all-singers.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'all-singers',
        component: AllSingersComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingerRoutingModule {

}
