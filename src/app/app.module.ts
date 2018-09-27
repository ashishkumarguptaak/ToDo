import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Ng2Webstorage } from  'ngx-webstorage';
import { MatCardModule } from '@angular/material';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodayTaskComponent } from './today-task/today-task.component';
import { MonthlyTaskComponent } from './monthly-task/monthly-task.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'routes';
import { HttpModule } from '@angular/http';

import {Auth} from './services/auth.service';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodayTaskComponent,
    MonthlyTaskComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    Ng2Webstorage,
    HttpModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule
    ],
  providers: [CookieService,
    Auth
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MyDialogComponent
  ]
})
export class AppModule { }
