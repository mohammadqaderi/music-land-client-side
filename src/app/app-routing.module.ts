import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './main-components/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./main-modules/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./main-modules/dashboard/dashboard.module')
      .then(d => d.DashboardModule)
  },
  {
    path: 'singers',
    loadChildren: () => import('./main-modules/singer/singer.module').
    then(s => s.SingerModule)
  },
  {
    path: 'musicians',
    loadChildren: () => import('./main-modules/musician/musician.module').
    then(m => m.MusicianModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {
}
