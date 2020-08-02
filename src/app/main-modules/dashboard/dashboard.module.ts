import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../Shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';



@NgModule({
  declarations: [ProfileComponent, SettingsComponent,
    FavoriteListComponent],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
