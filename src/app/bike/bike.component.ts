import { UserService } from '../service/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Bike } from './../model/bike';
import { BikePromiseService } from './bike-promise.service';
import { User } from '../model/user';

import * as M from 'materialize-css';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css']
})
export class BikeComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  @ViewChild('userSelected') userSelect!: ElementRef;
  user?: User;
  users!: User[];

  bike!: Bike;
  bikes?: Bike[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private bikePromiseService: BikePromiseService, private userService: UserService) { }

  ngOnInit(): void {
    this.refreshList();
    this.userService.listUsers().subscribe(
      (users) => {
        this.users = users;
        setTimeout(() => {
          M.FormSelect.init(this.userSelect.nativeElement), 100
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.bike.id == 0) {
      this.bike.id = this.getNextId();
      this.bikePromiseService.save(this.bike)
        .then(() => {
          this.isSuccess = true;
          this.message = 'Cadastro realizado com sucesso!';
          this.form.reset();
          this.refreshList();
        })
        .catch((e) => {
          this.isSuccess = false;
          this.message = e;
        })
        .finally(() => {
          console.log('Nova bike cadastrada com sucesso!');
        });
    } else {
      this.bikePromiseService.update(this.bike)
        .then(() => {
          this.isSuccess = true;
          this.message = 'Cadastro atualizado com sucesso!';
          this.form.reset();
          this.refreshList();
        })
        .catch((e) => {
          this.isSuccess = false;
          this.message = e;
        })
        .finally(() => {
          console.log('Bike atualizada com sucesso!');
        });
    }
    this.isShowMessage = true;
  }

  onEdit(bike: Bike) {
    this.isShowMessage = false;
    let clone = Bike.clone(bike);
    this.bike = clone;
    const user = this.users.find(user => user.id === bike.userId);
    this.user = user;
    setTimeout(() => {
      M.FormSelect.init(this.userSelect.nativeElement), 100
    });
  }

  onCancel() {
    this.isShowMessage = false;
    this.refreshList();
  }

  onDelete(delBike: Bike) {
    if (window.confirm('Você tem certeza que deseja remover ' + delBike.nome)) {
      let clone = Bike.clone(delBike);
      this.bike = clone;
      this.isShowMessage = true;
      this.bikePromiseService.delete(delBike)
        .then(() => {
          this.isSuccess = true;
          this.message = 'Cadastro removido com sucesso!';
          this.refreshList();
        })
        .catch((e) => {
          this.isSuccess = false;
          this.message = e;
        })
        .finally(() => {
          console.log('Bike removida!');
        });
    }
  }

  getNextId(): number {
    if (this.bikes != null) {
      const maxId = Math.max(...this.bikes.map((b) => b.id), 0);
      return maxId + 1;
    } else {
      return 1;
    }
  }

  refreshList() {
    this.bike = new Bike('', '', '');
    this.bikePromiseService
      .getAll()
      .then((promiseBikes) => (this.bikes = promiseBikes));
  }

  userChange(event: any) {
    console.log("selected value", event.target.value, 'value of selected', this.user);
    this.user = event.target.value;
  }
}
