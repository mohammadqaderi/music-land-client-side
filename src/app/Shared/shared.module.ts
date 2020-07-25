import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./modules/material.module";
import {FileModule} from "./modules/file.module";
import {NgxModule} from "./modules/ngx.module";

@NgModule({
  declarations: [],
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
  ]
})
export class SharedModule { }
