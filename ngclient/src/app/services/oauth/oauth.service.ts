import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  private API_URL = 'http://localhost:8080';
  constructor(public http: HttpClient) {}

  loginWithGoogle() {
    return this.http.get(`${this.API_URL}/api/authorize`);
  }
}
