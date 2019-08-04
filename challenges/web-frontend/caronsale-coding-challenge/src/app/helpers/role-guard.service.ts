import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserType } from "../common";
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedType = route.data.expectedType;
    const location = route.data.location;

    // decode the token to get its payload
    if (this.auth.currentUserValue.type !== expectedType) {
      const user = UserType.filter((user) => {
        if (user.type === this.auth.currentUserValue.type) {
          return user;
        }
      })[0];
      this.router.navigate([user.href]);
      return false;
    }
    return true;
  }
}
