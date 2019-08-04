import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../environments/environment';

import { AuctionModel } from "../models/auction.model";

@Injectable({
  providedIn: 'root'
})
export class AuctionsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<AuctionModel[]> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        userid: user.userId
      })
    };
    return this.http.get<AuctionModel[]>(
        `${environment.api_url}/auction/dealership/${user.userId}`,
        options)
        .pipe(map(auctions => {
          return auctions;
        }));
  }


}
