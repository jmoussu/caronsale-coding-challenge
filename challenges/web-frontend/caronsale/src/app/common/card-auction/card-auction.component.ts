import { Component, Input } from '@angular/core';
import { Auction } from 'src/app/models/auction';

@Component({
  selector: 'app-card-auction',
  templateUrl: './card-auction.component.html',
  styleUrls: ['./card-auction.component.scss']
})
export class CardAuctionComponent {
  @Input() auction: Auction;
}
