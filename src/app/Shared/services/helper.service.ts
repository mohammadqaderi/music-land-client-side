import {Injectable, TemplateRef} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  modalRef: BsModalRef;
  constructor(private dialog: MatDialog, private modalService: BsModalService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) { }


  // showing Dialogs
  openDialog(template: TemplateRef<any>){
    this.dialog.open(template);
  }
  hideDialog(){
    this.dialog.closeAll();
  }

  // Showing Modals
  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }
  hideModal(){
    this.modalRef.hide();
  }

  // For Spinners
  showSpinner(){
    this.spinner.show();
  }

  hideSpinner(){
    this.spinner.hide();
  }

  // for toast messages
  openSnackbar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    })
  }
}
