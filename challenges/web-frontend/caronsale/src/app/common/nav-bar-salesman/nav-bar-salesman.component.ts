import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-nav-bar-salesman',
  templateUrl: './nav-bar-salesman.component.html',
  styleUrls: ['./nav-bar-salesman.component.scss']
})
export class NavBarSalesmanComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
