import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SalesmanOverviewComponent } from './components/salesman-overview/salesman-overview.component';
import { DealershipOverviewComponent } from './components/dealership-overview/dealership-overview.component';
import { NavBarComponent } from './common/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavBarSalesmanComponent } from './common/nav-bar-salesman/nav-bar-salesman.component';
import { CardAuctionComponent } from './common/card-auction/card-auction.component';
import { NavBarDealershipComponent } from './common/nav-bar-dealership/nav-bar-dealership.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SalesmanOverviewComponent,
    DealershipOverviewComponent,
    NavBarComponent,
    HomeComponent,
    NavBarSalesmanComponent,
    CardAuctionComponent,
    NavBarDealershipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
