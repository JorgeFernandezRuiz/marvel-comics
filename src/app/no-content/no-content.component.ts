import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.css']
})
export class NoContentComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  ngOnInit(): void {
    /*
    if (window.location.href.indexOf('state') !== -1) {
      this.oauthService.events.subscribe(event => {
        if ((event.type === 'token_received')
          && this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken()) {
          console.log('claims--->', this.oauthService.getIdentityClaims());
          console.log('user profile ---->', this.oauthService.loadUserProfile());

          window.location.href = window.location.origin  + '/buscar';
        }
      });
    } else {
      console.log('claims--->', this.oauthService.getIdentityClaims());
      console.log('user profile ---->', this.oauthService.loadUserProfile());

      window.location.href = window.location.origin  + '/buscar';
    }*/
  }

}
