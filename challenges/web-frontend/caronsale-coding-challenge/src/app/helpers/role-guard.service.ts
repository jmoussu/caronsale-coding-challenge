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
    const expectedPrivileges = route.data.expectedPrivileges;
    const location = route.data.location;

    if (this.auth.currentUserValue.privileges !== expectedPrivileges) {
      const user = UserType.filter((user) => {
        if (user.privileges === this.auth.currentUserValue.privileges) {
          return user;
        }
      })[0];
      this.router.navigate([user.href]);
      return false;
    }
    return true;
  }
}
