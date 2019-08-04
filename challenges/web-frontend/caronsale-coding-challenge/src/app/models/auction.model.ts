import { Deserializable } from './deserializable.model';
import { Vehicle} from "./vehicle.model";

export class AuctionModel {
  public label: string;
  public associatedVehicle: Vehicle;
  public endingTime: string;
  public remainingTimeInSeconds: number;
  public currentHighestBidValue: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}


