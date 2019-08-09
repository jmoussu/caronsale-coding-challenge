import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import * as sha from "js-sha512";

const api_url = "https://caronsale-backend-service-dev.herokuapp.com/api/v1";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) { }

  public isAuth() {
    return !!this.currentUser;
  }

  login(email: string, password: string) {
    this.http
      .put(api_url + `/authentication/${email}`, {
        password: this.hashPasswordWithCycles(password, 5)
      })
      .subscribe((response: any) => {
        console.log(response);
        if (!!response.authenticated) {
          this.currentUser = response;
          this.router.navigateByUrl("/");
        }
      });
  }

  private hashPasswordWithCycles(
    plainTextPassword: string,
    cycles: number
  ): string {
    let hash = `${plainTextPassword}`;
    for (let i = 0; i < cycles; i++) {
      hash = sha.sha512(hash);
    }

    return hash;
  }
}
