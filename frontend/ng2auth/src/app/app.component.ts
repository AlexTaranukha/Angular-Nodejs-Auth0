import { Component } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <nav class="navbar-default">
        <div class="navbar-header">
          <a class="navbar" routerLink="/dashboard"></a>
        </div>
        <ul class="nav navbar-nav">
          <li>
            <a routerLink="/deals" routerLinkActive="active">Deals</a>
          </li>
          <li>
            <a routerLink="/special" routerLinkActive="active">Private Deals</a>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a *ngIf="!authService.isLoggedIn" (click)="authService.login()">Log In</a>
          </li>
          <li>
            <a *ngIf="authService.isLoggedIn" (click)="authService.logout()">Log Out</a>
          </li>
        </ul>
      </nav>
      <div class="col-sm-12">
        <router-outlet></router-outlet>
      </div>
    </div>
    `,
    styles: [
      `.navbar-right {margin-right: 0px !important}`
    ]
  })
  export class AppComponent {
    title = 'Daily Deals';
  constructor(public authService: AuthService) {}
}
