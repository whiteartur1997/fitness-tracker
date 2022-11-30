import { UserModel } from './user.model';
import { AuthDataModel } from './auth-data.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environements/environment';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const firebaseAuthUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';

@Injectable()
export class AuthService {
  private user: UserModel | null;

  constructor(private router: Router, private http: HttpClient) {
    this.user = null;
  }

  userChanged = new BehaviorSubject<typeof this.user>(null);

  register(authData: AuthDataModel) {
    this.http
      .post<AuthResponseData>(
        `${firebaseAuthUrl}signUp?key=${environment.firebaseApiKey}`,
        {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true,
        }
      )
      .subscribe(res => {
        // this.user = {
        //   email: res.email,
        //   userId: Math.floor(Math.random() * 1000).toString(),
        // };
        console.log(res);
      });
    // this.authSuccess();
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
