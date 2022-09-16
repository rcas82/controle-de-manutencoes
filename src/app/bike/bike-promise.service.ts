import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Bike } from '../model/bike';

@Injectable({
  providedIn: 'root',
})
export class BikePromiseService {
  URL = 'http://localhost:3000/bikes';
  URL_PT = 'http://localhost:3000/bicicletas';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getAll(): Promise<Bike[] | undefined> {
    return this.httpClient.get<Bike[]>(`${this.URL}`).toPromise();
  }

  getByNome(nome: string): Promise<Bike[] | undefined> {
    return this.httpClient.get<Bike[]>(`${this.URL_PT}/${nome}`).toPromise();
  }

  save(bike: Bike): Promise<Bike | undefined> {
    return this.httpClient
      .post<Bike>(this.URL, JSON.stringify(bike), this.httpOptions)
      .toPromise();
  }

  patch(bike: Bike): Promise<Bike | undefined> {
    return this.httpClient
      .patch<Bike>(
        `${this.URL}/${bike.id}`,
        JSON.stringify(bike),
        this.httpOptions
      )
      .toPromise();
  }

  update(bike: Bike): Promise<Bike | undefined> {
    return this.httpClient
      .put<Bike>(
        `${this.URL}/${bike.id}`,
        JSON.stringify(bike),
        this.httpOptions
      )
      .toPromise();
  }

  delete(bike: Bike): Promise<any> {
    return this.httpClient
      .delete<Bike>(`${this.URL}/${bike.id}`)
      .toPromise();
  }
}
