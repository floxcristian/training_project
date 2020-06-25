// Solve the issue: https://stackoverflow.com/questions/35296704/angular2-how-to-call-component-function-from-outside-the-app
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { OauthService } from '../services/oauth/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private _ngZone: NgZone, private oauthSrv: OauthService) {
    window['angularComponentRef'] = { component: this, zone: this._ngZone };
  }

  ngOnInit(): void {}

  loginWithGoogle() {
    this.oauthSrv.loginWithGoogle().subscribe((res: any) => {
      //window.location.href = res.authUrl;
      window.open(res.authUrl, '_blank'); // Crea un tab
      // Llamar a un método del componente desde fuera de la app.
    });
  }

  runThisFunctionFromOutside(token) {
    localStorage.setItem('jwt', token);
    location.href = '../home';
  }
  ngOnDestroy() {
    window['angularComponentRef'] = null;
  }

  /*
  // Detecta si el popup se cierra y habilita el parent window
  checkPopUpClosed(win) {
    var timer = setInterval(function () {
      if (win.closed) {
        clearInterval(timer);
        enableParentWin();
      }
    }, 1000);
  }

  // Habilita el parent window
  enableParentWin() {
    window.document.getElementById('mainDiv').class = '';
  }

  // Deshabilita el parent window
  disableParentWin() {
    window.document.getElementById('mainDiv').class = 'disableWin';
  }*/
}
