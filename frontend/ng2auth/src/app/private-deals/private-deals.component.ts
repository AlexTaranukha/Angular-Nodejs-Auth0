import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Deal } from '../deal';

import { AuthService } from '../auth.service';
import { DealService } from '../deal.service';

@Component({
  selector: 'app-private-deals',
  templateUrl: './private-deals.component.html',
  styleUrls: ['./private-deals.component.css']
})

export class PrivateDealsComponent implements OnInit {

  dealsSub: Subscription;
  privateDeals: Deal[];
  error: any;

  constructor(
    public dealService: DealService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.dealsSub = this.dealService
      .getPrivateDeals()
      .subscribe (
        deals => this.privateDeals = deals,
        err => this.error = err
      );
  }

  ngOnDestroy(){
    this.dealsSub.unsubscribe();
  }
}
