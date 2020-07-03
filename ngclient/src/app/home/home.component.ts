import { Component, OnInit } from '@angular/core';
import { OauthService } from '../services/oauth/oauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tokens;
  labels;
  constructor(private oauthSrv: OauthService) {}

  ngOnInit(): void {
    this.tokens = this.oauthSrv.getCredentials();
  }

  getEmailLabels() {
    this.oauthSrv.getGmailLabels(this.tokens).subscribe((res: any[]) => {
      this.labels = res;
    });
  }
}
