import { Component, OnInit, Inject } from '@angular/core';
import { Auth } from '../services/auth.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
profile:any
  constructor(private auth:Auth){ 
    this.auth.handleAuthentication();
    if(this.auth.isAuthenticated())
    if (this.auth.userProfile!==undefined) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
   }
}
