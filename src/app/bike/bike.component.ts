import { Component, OnInit, ViewChild } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Bike } from './../model/bike';
import { BikeService } from './bike-webstorage.service';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css'],
  providers: [BikeService],
})
export class BikeComponent implements OnInit {
  @ViewChild('form') form!: NgForm;

  bike!: Bike;
  bikes?: Bike[];

  isSubmitted!: boolean;
  isShowMessage: boolean = false;
  isSuccess!: boolean;
  message!: string;

  constructor(private bikeService: BikeService) { }

  ngOnInit(): void {
    this.bike = new Bike(1, '', '', '');
    this.bikes = this.bikeService.getBikes();
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.bikeService.isExist(this.bike.nome)) {
      this.bikeService.save(this.bike);
    } else {
      this.bikeService.update(this.bike);
    }
    this.isShowMessage = true;
    this.isSuccess = true;
    this.message = 'Cadastro realizado com sucesso!';

    this.form.reset();
    this.bike = new Bike(1, '', '', '');

    this.bikes = this.bikeService.getBikes();
  }

  /**
   * Realiza o clone do objeto, justamente para não refletir as mudanças
   * imediatamente na lista de usuários cadastrados sem pressionar o submit.
   * @param bike
   */
  onEdit(bike: Bike) {
    //this.user = user;
    let clone = Bike.clone(bike);
    this.bike = clone;
  }

  onDelete(nome: string) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja remover ' + nome
    );
    if (!confirmation) {
      return;
    }
    let response: boolean = this.bikeService.delete(nome);
    this.isShowMessage = true;
    this.isSuccess = response;
    if (response) {
      this.message = 'O item foi removido com sucesso!';
      this.form.reset();
      this.bike = new Bike(1, '', '', '');
    } else {
      this.message = 'Opps! O item não pode ser removido!';
    }
    this.bikes = this.bikeService.getBikes();
  }
}
