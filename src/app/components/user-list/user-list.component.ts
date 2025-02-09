import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateFormGroupArgs } from '@progress/kendo-angular-grid';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import { Role } from 'src/enum/role.enum';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  title = '';
  currentUser: any = {};
  currentIndex = -1;
  roles: string[] = [];

  public formGroup: FormGroup = this.formBuilder.group({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: null,
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.createFormGroup = this.createFormGroup.bind(this);
  }

  createFormGroup(): User {
    return new User();
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.roles = Object.keys(Role).filter((key) => isNaN(Number(key)));
  }

  addUser() {
    const newUser: User = {
      id: (this.users.length + 1).toString(),
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleId: '',
    };
    this.users = [...this.users, newUser];

    this.userService.add(newUser).subscribe(() => this.getAllUsers());
  }

  getAllUsers(): void {
    this.userService.getAll().subscribe((users) => (this.users = users));
  }

  update({ formGroup, dataItem }: { formGroup: FormGroup; dataItem: User }) {
    if (!dataItem.id) {
      dataItem.id = this.users.length
        ? (Math.max(...this.users.map((u) => Number(u.id))) + 1).toString()
        : '1';
      this.userService.add(dataItem).subscribe((savedUser) => {
        this.users = this.users.map((u) => (u === dataItem ? savedUser : u));
      });
    } else {
      this.userService.update(dataItem.id, dataItem).subscribe();
    }
  }

  remove({ dataItem }: { dataItem: User }) {
    this.userService.delete(dataItem.id).subscribe(() => {
      this.getAllUsers();
    });
  }
}
