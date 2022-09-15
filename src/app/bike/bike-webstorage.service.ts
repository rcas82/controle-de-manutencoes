import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { Bike } from '../model/bike';
import { WebStorageUtil } from 'src/app/util/web-storage-util';

@Injectable()
export class BikeService {
  bikes!: Bike[];
  constructor() {
    this.bikes = WebStorageUtil.get('bikes');
  }

  save(bike: Bike) {
    this.bikes = WebStorageUtil.get('bikes');
    this.bikes.push(bike);
    WebStorageUtil.set('bikes', this.bikes);
  }

  update(bike: Bike) {
    this.bikes = WebStorageUtil.get('bikes');
    this.delete(bike.nome);
    this.save(bike);
  }

  delete(nome: string): boolean {
    this.bikes = WebStorageUtil.get('bikes');
    this.bikes = this.bikes.filter((bike) => {
      return bike.nome?.valueOf() != nome?.valueOf();
    });

    WebStorageUtil.set('bikes', this.bikes);
    return true;
  }

  isExist(value: string): boolean {
    this.bikes = WebStorageUtil.get('bikes');
    for (let bike of this.bikes) {
      if (bike.nome?.valueOf() == value?.valueOf()) {
        return true;
      }
    }
    return false;
  }

  getBikes(): Bike[] {
    this.bikes = WebStorageUtil.get('bikes');
    return this.bikes;
  }
}
