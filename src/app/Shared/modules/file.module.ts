import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileDropDirective, FileSelectDirective, FileUploadModule} from "ng2-file-upload";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports: [
    FileUploadModule,
    FileSelectDirective,
    FileDropDirective
  ]
})
export class FileModule { }
