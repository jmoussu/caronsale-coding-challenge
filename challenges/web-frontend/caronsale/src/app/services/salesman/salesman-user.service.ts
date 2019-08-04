import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Auction } from '../../models/auction';
import { salesman } from '../../constants/api';

@Injectable({
  providedIn: 'root'
})

export class SalesmanUserService {

  constructor(private httpService: HttpClient) { }

  public getAuctions(): Observable<Auction[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        userid: localStorage.getItem('userId'),
        authtoken: localStorage.getItem('token')
      })
    };

    return this.httpService.get<Auction[]>(
      `${salesman}${localStorage.getItem('userId')}/_all`,
      httpOptions
    ).pipe(
        map(data => data.map(e => new Auction().deserialize(e))),
        catchError(() => throwError('no auctions where found for this user'))
    );
  }
}
