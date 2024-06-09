import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm: FormGroup;
  userId: number | null = null;
  constructor(private _uservice: UserService, private _fb: FormBuilder,
    private route: Router, private routers: ActivatedRoute
  ) {
    this.userForm = this._fb.group({
      name: [''],
      username: [''],
      email: [''],

    });

  }
  ngOnInit() {
    this.userId = this.routers.snapshot.params['id'];
    if (this.userId) {
      this._uservice.getUser(this.userId).subscribe((user) => {
        this.userForm.patchValue(user);
      });
    }

  }
  onSubmit(): void {
    if (this.userId) {
      this._uservice.updateUser(this.userId, this.userForm.value).subscribe(() => {
        this.route.navigate(['/']);
      });
    } else {
      this._uservice.createUser(this.userForm.value).subscribe(() => {
        this.route.navigate(['/']);
      });
    }
  }
}

