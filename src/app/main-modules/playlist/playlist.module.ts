import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPlaylistsComponent } from './user-playlists/user-playlists.component';
import { PlaylistDetailsComponent } from './playlist-details/playlist-details.component';
import {PlaylistRoutingModule} from './playlist-routing.module';
import {SharedModule} from '../../Shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [UserPlaylistsComponent, PlaylistDetailsComponent],
  imports: [
    CommonModule,
    PlaylistRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlaylistModule { }
