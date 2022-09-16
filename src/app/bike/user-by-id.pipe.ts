import { Pipe, PipeTransform } from "@angular/core";
import { User } from "../model/user";
import { UserService } from "../service/user.service";

@Pipe({
  name: 'userById'
})
export class UserByIdPipe implements PipeTransform {

  users!: User[];

  constructor(private userService: UserService) {
    this.userService.listUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  transform(userId: number, users: User[]): string {
    if (users) {
      const user = users.find(user => user.id === userId);
      return user ? user.nome : "";
    } else {
      return "";
    }
  };
}
