import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Acution } from 'src/app/models/acution';
import { salesman } from '../../constants/api';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class SalesmanUserService {

  constructor(private httpService: HttpClient) { }

  public getAuctions(): Observable<Acution> {
    return this.httpService.get(
      `${}`
    )
  }
}
