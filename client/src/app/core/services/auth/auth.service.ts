import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { UserManager, User } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private _userManager: UserManager;

  constructor(
    private http: HttpClient,

  ) { 
    //this._userManager = new UserManager();
  }
}
