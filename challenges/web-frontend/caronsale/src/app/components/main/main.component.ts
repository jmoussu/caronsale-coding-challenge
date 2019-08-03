import { Component, OnInit } from '@angular/core';

import { AuthenticationResult } from '../../models/authentication-result';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  authResult: AuthenticationResult;

  constructor() {
      const authResult = new AuthenticationResult();
      authResult.privileges = localStorage.getItem('userId');
      authResult.token = localStorage.getItem('token');
      authResult.privileges = localStorage.getItem('privelege');

      this.authResult = authResult;
  }

  ngOnInit() {
  }
}
