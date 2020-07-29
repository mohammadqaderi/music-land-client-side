import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserPlaylistsComponent} from './user-playlists/user-playlists.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-playlists',
        component: UserPlaylistsComponent
      }
    ]
  }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistRoutingModule {

}
