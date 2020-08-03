import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './Shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptorService} from './services/auth/token-interceptor.service';
import {ErrorInterceptorService} from './services/auth/error-interceptor.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {HomeComponent} from './main-components/home/home.component';
import {SocketIoModule} from 'ngx-socket-io';
import {environment} from '../environments/environment';
import {PageNotFoundComponent} from './main-components/page-not-found/page-not-found.component';
import {ResourceNotFoundComponent} from './main-components/resource-not-found/resource-not-found.component';
import {ApplicationErrorComponent} from './main-components/application-error/application-error.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {NotificationsComponent} from './main-components/notifications/notifications.component';
import {MainNavComponent} from './main-components/main-nav/main-nav.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    ResourceNotFoundComponent,
    ApplicationErrorComponent,
    NotificationsComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    SocketIoModule.forRoot(environment.socketIoConfig),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
