import { Component } from '@angular/core';
import { Auth } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ToDo';
  constructor(public auth: Auth,private router: Router) {
    this.auth.handleAuthentication();
  }
  ngOnInit() {
    this.router.navigate([''])
  }
}
