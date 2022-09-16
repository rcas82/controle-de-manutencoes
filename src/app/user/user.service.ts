import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  URL = 'http://localhost:3000/users';
  public users?: User[];
  public user?: User;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<User[]>(`${this.URL}`).subscribe(res => {
      this.users = res;
    })
  }

  listUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.URL}`);
  }
}
