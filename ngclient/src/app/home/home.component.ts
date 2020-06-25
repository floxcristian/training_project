import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OauthService } from '../services/oauth/oauth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tokens;
  labels;
  constructor(private route: ActivatedRoute, private oauthSrv: OauthService, private router: Router) {
    this.route.queryParams.subscribe((params) => {
      if (params['tokens']) this.tokens = params['tokens'];
    });

    this.router.navigate([], {
      queryParams: {
        tokens: null
      },
      queryParamsHandling: 'merge'
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log('tokens: ', this.tokens);
    }, 5000);
  }

  getEmailLabels() {
    this.oauthSrv.getGmailLabels(this.tokens).subscribe((res: any) => {
      console.log('labels: ', res);
      this.labels = res;
    });
  }
}
