import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deal } from './deal';

@Injectable()
export class DealService {
  private publicDealUrl = 'http://localhost:3001/api/deals/public';
  private privateDealUrl = 'http://localhost:3001/api/deals/private';

  constructor( private http: HttpClient, private authService: AuthService ) { }

  getPublicDeals() {
    return this.http
      .get<Deal[]>(this.publicDealUrl)
      .pipe (
        catchError(this.handleError)
      );
  }

  getPrivateDeals() {
    return this.http
      .get<Deal[]>(this.privateDealUrl, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)
      })
      .pipe (
          catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occured', err);
    return throwError(err.message || err);
  }

  purchase(item) {
    alert(`You bought the: ${item.name}`);
  }
}
