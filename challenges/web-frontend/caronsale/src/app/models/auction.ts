import { Deserializable } from './deserializable';
import { Vehicle } from './vehicle';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

export class Auction implements Deserializable {
  public label: string;
  public state: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

  public endingTime: string;
  public remainingTimeInSeconds: number;
  public remainingTimeForInstantPurchaseInSeconds: number;
  public createdAt: string;
  public startedAt: string;
  public paymentDueDate: string;
  public pickupDueDate: string;
  public purchaseConfirmedAt: string;
  public purchaseRejectedAt: string;
  public outgoingPaymentConfirmedAt: string;
  public incomingPaymentConfirmedAt: string;
  public pickupConfirmedAt: string;
  public locationCountryCode: 'DE' | 'AT' | 'CH' | 'CZ' | 'PL' | 'US';

  public locationCountry: string;
  public locationAddress: string;
  public locationCity: string;
  public locationZip: string;
  public minimumRequiredAsk: number;
  public originalMinimumRequiredAsk: number;
  public purchasePrice: number;
  public currentHighestBidValue: number;
  public numBids: number;
  public associatedVehicle: Vehicle;

  public isRatedByDealership: boolean;
  public isRatedByBuyer: boolean;
  public isPaidByBuyer: boolean;
  public invoice: any;
  public urlToInvoice: string;
  public hotBid: boolean;
  public instantPurchasePrice: number;
  public allowInstantPurchase: boolean;
  public didEndWithInstantPurchase: boolean;
  public instantPurchasePossibleUntil: string;
  public auctioningIterations: number;
  public priority: number;
  public advertisementHtmlContent: string;
  public urlToPickUpAuthorizationDocument: string;
  public buyerComplaint: '0' | '1' | '2' | '3' | '4' | '5';

  public _fk_associatedVehicle: number;
  public _fk_associatedDealershipUser: number;
  public _fk_highestBiddingSalesmanUser: number;

  public id: number;

  public timeRemaining$: Observable<string> = timer(0, 1000).pipe(
    map(() => {
      const end = moment(this.endingTime);
      const diff = moment.duration(end.diff(moment()));
      return `${diff.days()} ${diff.days() < 2 ? 'day' : 'days'} ${diff.hours()}:${diff.minutes()}:${diff.seconds()} hours`;
    })
  );

  deserialize(input: any): this {
    return Object.assign(this, input);
  }

  calculateRemainingTime(time: string): string {
    return '';
  }
}
