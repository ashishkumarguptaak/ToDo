import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

(window as any).global = window;

@Injectable()
export class Auth {
  userProfile: any;

  auth0 = new auth0.WebAuth({
    clientID: 'client ID from auth0 application settings',
    domain: 'domain from auth0',
    responseType: 'token id_token',
    redirectUri: 'call back uri',
    scope: 'openid profile'
  });

  constructor(public router: Router) {}

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        console.log("I'm in handleAuthentication");
        this.router.navigate(['/today']);
      } else if (err) { 
        this.router.navigate(['/monthly']);
        console.log(err);
      }
    });
  }

  public login(): void {
    console.log("I'm in login");
    this.auth0.authorize();
  }


  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    console.log("I'm in logout");
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    const accessToken = localStorage.getItem('access_token');

    return accessToken!==null;
  }

  public getProfile(cb): void {
    console.log("I'm in getProfile");
    const accessToken = localStorage.getItem('access_token');
    if (accessToken===null) {
      throw new Error('Access Token must exist to fetch profile');
    }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }
      cb(err, profile);
    });
  }
}