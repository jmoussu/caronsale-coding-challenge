import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { HomeSalesmanComponent } from './home-salesman';
import { HomeDealershipComponent } from "./home-dealership";
import { AlertComponent } from "./common";
import { ErrorInterceptor, JwtInterceptor } from "./helpers";
import { RoleGuardService } from "./helpers/role-guard.service";
import { CountdownPipe } from './pipes/countdown.pipe';
import { FuelPipe } from './pipes/fuel.pipe';
import { TransmissionPipe } from './pipes/transmission.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeSalesmanComponent,
    HomeDealershipComponent,
    AlertComponent,
    CountdownPipe,
    FuelPipe,
    TransmissionPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    RoleGuardService,
    {
      provide: LOCALE_ID,
      useValue: 'de',
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
