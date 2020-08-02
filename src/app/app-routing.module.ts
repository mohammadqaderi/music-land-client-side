import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './main-components/home/home.component';
import {UserAuthGuard} from './commons/guards/user-auth.guard';
import {ResourceNotFoundComponent} from './main-components/resource-not-found/resource-not-found.component';
import {ApplicationErrorComponent} from './main-components/application-error/application-error.component';
import {PageNotFoundComponent} from './main-components/page-not-found/page-not-found.component';

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
    path: 'resource-not-found/:status',
    component: ResourceNotFoundComponent
  },
  {
    path: 'application-error/:status',
    component: ApplicationErrorComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./main-modules/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./main-modules/dashboard/dashboard.module')
      .then(d => d.DashboardModule)
  },
  {
    path: 'singers',
    loadChildren: () => import('./main-modules/singer/singer.module').then(s => s.SingerModule)
  },
  {
    path: 'songs',
    loadChildren: () => import('./main-modules/song/song.module').then(s => s.SongModule)
  },
  {
    path: 'musics',
    loadChildren: () => import('./main-modules/music/music.module').then(m => m.MusicModule)
  },
  {
    path: 'playlists',
    canActivate: [UserAuthGuard],
    loadChildren: () => import('./main-modules/playlist/playlist.module').then(p => p.PlaylistModule)
  },
  {
    path: 'musicians',
    loadChildren: () => import('./main-modules/musician/musician.module').then(m => m.MusicianModule)
  },
  {
    path: 'rooms',
    loadChildren: () => import('./main-modules/room/room.module').then(r => r.RoomModule)
  },


  {
    path: '**',
    component: PageNotFoundComponent
  }
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
