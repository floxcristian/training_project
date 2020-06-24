import { Component, OnInit } from '@angular/core';
import { OauthService } from '../services/oauth/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private oauthSrv: OauthService) {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.oauthSrv.loginWithGoogle().subscribe((res: any) => {
      window.location.href = res.authUrl;
    });
    console.log('login with google');
  }
}
