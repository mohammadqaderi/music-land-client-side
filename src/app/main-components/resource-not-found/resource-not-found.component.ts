import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HelperService} from '../../Shared/services/helper.service';

@Component({
  selector: 'app-resource-not-found',
  templateUrl: './resource-not-found.component.html',
  styleUrls: ['./resource-not-found.component.css']
})
export class ResourceNotFoundComponent implements OnInit {

  @ViewChild('resourceNotFoundErrorTemp', {static: true}) appErrorTemp: TemplateRef<any>;
  constructor(public helperService: HelperService) { }

  ngOnInit(): void {
    this.helperService.openModal(this.appErrorTemp);
  }
}
