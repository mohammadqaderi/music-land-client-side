import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-invalid-credentials',
  templateUrl: './invalid-credentials.component.html',
  styleUrls: ['./invalid-credentials.component.css']
})
export class InvalidCredentialsComponent implements OnInit {

  constructor() { }

  @Input() modalRef: BsModalRef;

  ngOnInit(): void {
  }

  hideModal(){
    this.modalRef.hide();
  }

}
