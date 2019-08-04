import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-nav-bar-dealership',
  templateUrl: './nav-bar-dealership.component.html',
  styleUrls: ['./nav-bar-dealership.component.scss']
})
export class NavBarDealershipComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }
}
