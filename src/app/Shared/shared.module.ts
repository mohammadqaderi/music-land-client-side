import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./modules/material.module";
import {FileModule} from "./modules/file.module";
import {NgxModule} from "./modules/ngx.module";
import { InvalidCredentialsComponent } from './components/invalid-credentials/invalid-credentials.component';

@NgModule({
  declarations: [InvalidCredentialsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FileModule,
    NgxModule
  ],
  exports: [
    MaterialModule,
    FileModule,
    NgxModule,
    InvalidCredentialsComponent
  ]
})
export class SharedModule { }
