import { Vehicle } from "./vehicle.model";

export class AuctionModel {
    public label: string;
    public associatedVehicle: Vehicle;
    public endingTime: string;
    public remainingTimeInSeconds: number;
    public currentHighestBidValue: number;


}
