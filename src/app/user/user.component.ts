import { UserService } from './user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from './../model/user';
import * as M from "materialize-css";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  @ViewChild('userSelected') userSelect!: ElementRef;
  user?: User;
  users?: User[];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.listUsers().subscribe(
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

  listUsers() {

  }

  userChange(event: any) {
    console.log("selected value", event.target.value, 'value of selected', this.user);
    this.user = event.target.value;
  }
}
