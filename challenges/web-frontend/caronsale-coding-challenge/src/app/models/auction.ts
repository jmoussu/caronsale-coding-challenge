import { Vehicle} from "./vehicle";

export class Auction {
  label: string;
  associatedVehicle: Vehicle;
  endingTime: string;
  remainingTimeInSeconds: number;
  currentHighestBidValue: number;
}
