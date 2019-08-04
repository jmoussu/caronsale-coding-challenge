import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthenticationService } from "../services";
import { User } from '../models';

@Component({
  selector: 'app-home-salesman',
  templateUrl: './home-salesman.component.html',
  styleUrls: ['./home-salesman.component.scss']
})
export class HomeSalesmanComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}
