import { Component, OnInit } from '@angular/core';
import { first, takeWhile, switchMap } from 'rxjs/operators';
import { timer} from 'rxjs';
import { AuthenticationService, AuctionsService } from "../services";
import { AuctionModel } from "../models/auction.model";

@Component({
  selector: 'app-home-dealership',
  templateUrl: './home-dealership.component.html',
  styleUrls: ['./home-dealership.component.scss']
})
export class HomeDealershipComponent implements OnInit {
  public auctions:AuctionModel[] = [];

  constructor(
    private authenticationService: AuthenticationService,
    private auctionsService: AuctionsService
  ) { }

  ngOnInit() {
    this.loadAllAuctions();

    timer(0, 20000).subscribe(() => {
      this.loadAllAuctions();
    });
  }

  private loadAllAuctions() {
    this.auctionsService.getAll().pipe(first()).subscribe(auctions => {
      this.auctions = auctions;
    });
  }
}
