import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { UserManager, User } from 'oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //private _userManager: UserManager;

  constructor(private http: HttpClient) {
    //this._userManager = new UserManager();
  }

  login() {
    const state = '';
    localStorage.setItem('auth_state', state);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('profile');
  }
}
