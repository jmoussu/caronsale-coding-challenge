import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import * as sha512 from 'js-sha512';

@Injectable({providedIn: 'root'})
export class Sha512 {
  constructor() {
  }

  hashPasswordWithCycles(plainTextPassword: string, cycles: number): string {
    let hash = `${plainTextPassword}`;

    for (let i = 0; i < cycles; i++) {
      hash = sha512.sha512(hash);
    }

    return hash;
  }
}
