import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  constructor(private _uservice: UserService) {

  }
  users: any[] = [];
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers(): void {
    this._uservice.getUsers().subscribe((data: any) => {
      this.users = data;
      console.log(this.users);
    });
  }
  deleteUser(id: number): void {
    this._uservice.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}
