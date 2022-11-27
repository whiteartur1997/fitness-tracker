import { UserModel } from './user.model';
import { AuthDataModel } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private user: UserModel | null;

  constructor(private router: Router) {
    this.user = null;
  }

  userChanged = new BehaviorSubject<typeof this.user>(null);

  register(authData: AuthDataModel) {
    this.user = {
      email: authData.email,
      userId: Math.floor(Math.random() * 1000).toString(),
    };
    this.authSuccess();
  }

  login(authData: AuthDataModel) {
    this.user = {
      email: authData.email,
      userId: Math.floor(Math.random() * 1000).toString(),
    };
    this.authSuccess();
  }

  logout() {
    this.user = null;
    this.userChanged.next(null);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.user !== null;
  }

  getUser() {
    return { ...this.user };
  }

  private authSuccess() {
    this.userChanged.next(this.user);
    this.router.navigate(['/trainings']);
  }
}
