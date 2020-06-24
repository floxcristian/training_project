import { Component } from '@angular/core';
import { OauthService } from './services/oauth/oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngclient';

  constructor(private oauthSrv: OauthService) {}
}
