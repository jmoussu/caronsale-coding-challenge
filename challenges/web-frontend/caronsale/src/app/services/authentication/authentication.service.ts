import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { sha512 } from 'js-sha512';

import { AuthenticationResult } from '../../models/authentication-result';
import { authentication } from '../../constants/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  isLoggedIn = false;
  authResult: AuthenticationResult;

  constructor(private httpService: HttpClient) { }

  public authenticate(email: string, password: string): Observable<AuthenticationResult> {
    const hashedPassword = this.hashPassword(password, 5);

    return this.httpService.put<AuthenticationResult>(
        `${authentication}/${email}`,
        { password: hashedPassword },
        httpOptions
    ).pipe(
      map(data => {
        this.isLoggedIn = true;
        const authResult = new AuthenticationResult().deserialize(data);
        return authResult;
      }),
      catchError(() => throwError('user not found'))
    );
  }

  private hashPassword(password: string, cycles: number): string {
    let hash = `${password}`;

    for (let i = 0; i < cycles; i++) {
      hash = sha512(hash);
    }

    return hash;
  }
}
