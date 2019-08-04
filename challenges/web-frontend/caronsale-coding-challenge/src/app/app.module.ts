import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeSalesmanComponent,
    HomeDealershipComponent,
    AlertComponent
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
