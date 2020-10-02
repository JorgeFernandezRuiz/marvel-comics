import { Component, OnInit } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string;

  constructor(private oauthService: OAuthService) { }

  ngOnInit(): void {
    this.title = 'DC Comics';
  }
  public logoff() {
    this.oauthService.logOut();
  }
}
