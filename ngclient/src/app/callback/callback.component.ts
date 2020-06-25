import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OauthService } from '../services/oauth/oauth.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {
  tokens: string;

  constructor(private route: ActivatedRoute, private oauthSrv: OauthService, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if (params['tokens']) {
        this.tokens = params['tokens'];
        this.oauthSrv.storeCredentials(this.tokens);
        this.router.navigate(['home']);
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.oauthSrv.getCredentials());
    }, 5000);
  }

  redirectToHome() {}
}
