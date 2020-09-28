import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {OAuthService} from 'angular-oauth2-oidc';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  private oAuthService: OAuthService;
  constructor(private router: Router, private pOAuth: OAuthService) {
    this.oAuthService = pOAuth;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkUser();
  }

  private checkUser(): boolean  {
      const hasValidIdToken = this.oAuthService.hasValidIdToken();
      const hasValidAccessToken = this.oAuthService.hasValidAccessToken();
      if (hasValidIdToken && hasValidAccessToken) {
        return true;
      }
      this.pOAuth.initLoginFlow();
      return false;
  }
}
