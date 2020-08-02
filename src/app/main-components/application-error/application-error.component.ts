import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HelperService} from '../../Shared/services/helper.service';

@Component({
  selector: 'app-application-error',
  templateUrl: './application-error.component.html',
  styleUrls: ['./application-error.component.css']
})
export class ApplicationErrorComponent implements OnInit {

  @ViewChild('appErrorTemp', {static: true}) appErrorTemp: TemplateRef<any>;
  constructor(public helperService: HelperService) { }

  ngOnInit(): void {
    this.helperService.openModal(this.appErrorTemp);
  }

}
