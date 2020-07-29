import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {NgxStarRatingModule} from 'ngx-star-rating';


const ngxComponents = [
  CarouselModule.forRoot(),
  TooltipModule.forRoot(),
  ModalModule.forRoot(),
  PopoverModule.forRoot(),
  AccordionModule.forRoot(),
  PaginationModule.forRoot()
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ngxComponents,
    NgxSpinnerModule,
    NgxAudioPlayerModule,
    NgxStarRatingModule,
    ToastrModule.forRoot()
  ],
  exports: [ngxComponents, NgxStarRatingModule, NgxSpinnerModule, ToastrModule, NgxAudioPlayerModule]
})
export class NgxModule {
}
