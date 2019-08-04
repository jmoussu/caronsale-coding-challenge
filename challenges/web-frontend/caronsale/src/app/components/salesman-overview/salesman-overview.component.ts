import { Component, OnInit } from '@angular/core';
import { SalesmanUserService } from 'src/app/services/salesman/salesman-user.service';
import { Auction } from 'src/app/models/auction';
import { Observable, timer, Subject, of } from 'rxjs';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-salesman-overview',
  templateUrl: './salesman-overview.component.html',
  styleUrls: ['./salesman-overview.component.scss']
})

export class SalesmanOverviewComponent implements OnInit {
  // Kill subject to stop all requests for component
  private killTrigger: Subject<void> = new Subject();

  private fetchData$: Observable<Auction[]> = this.salesmanUserService.getAuctions();

  private refreshInterval$: Observable<string | Auction[]> = timer(0, 20000)
    .pipe(
      takeUntil(this.killTrigger),
      switchMap(() => this.fetchData$),
      catchError(error => of('Error'))
    );

  public auctions: Auction[];

  constructor(private salesmanUserService: SalesmanUserService) { }

  ngOnInit() {
    this.refreshInterval$.subscribe((auctions: Auction[]) => {
      console.log(auctions);
      this.auctions = auctions;
    });
  }

  ngOnDestrio() {
    this.killTrigger.next();
  }
}
