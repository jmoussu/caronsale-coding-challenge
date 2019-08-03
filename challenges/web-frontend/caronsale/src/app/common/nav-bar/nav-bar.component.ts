import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn = false;

  apptitle = 'caronsale';

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {

  }
}
