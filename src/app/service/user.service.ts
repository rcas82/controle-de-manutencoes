import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'http://localhost:3000/users';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) { }

  listUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.URL}`);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}/${id}`);
  }
}
