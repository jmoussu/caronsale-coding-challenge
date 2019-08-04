import { Component, OnInit, OnDestroy } from '@angular/core';
import { Auction } from 'src/app/models/auction';
import { Observable, timer, Subject, of } from 'rxjs';
import { takeUntil, switchMap, catchError } from 'rxjs/operators';
import { DealershipUserService } from 'src/app/services/dealership/dealership-user.service';

@Component({
  selector: 'app-dealership-overview',
  templateUrl: './dealership-overview.component.html',
  styleUrls: ['./dealership-overview.component.scss']
})
export class DealershipOverviewComponent implements OnInit, OnDestroy {
  // Kill subject to stop all requests for component
  private killTrigger: Subject<void> = new Subject();

  private fetchData$: Observable<Auction[]> = this.dealershipService.getAuctions();
  private refreshInterval$: Observable<string | Auction[]> = timer(0, 20000)
    .pipe(
      takeUntil(this.killTrigger),
      switchMap(() => this.fetchData$),
      catchError(error => of('Error'))
  );

  auctions$: Subject<Auction[]> = new Subject<Auction[]>();
  didLoadData = false;

  constructor(private dealershipService: DealershipUserService) { }

  ngOnInit() {
    this.refreshInterval$.subscribe((auctions: Auction[]) => {
      this.auctions$.next(auctions);
      this.didLoadData = true;
    });
  }

  ngOnDestroy() {
    this.killTrigger.next();
  }

  trackById(index: number, auction: Auction): number {
    return auction.id;
  }
}
