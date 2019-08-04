import { Deserializable } from './deserializable';
import { VehicleImages } from './vehicle-images';

export class Vehicle implements Deserializable {
  public vin: string;
  public make: string;
  public model: string;
  public datBaseModelRaw: string;
  public ez: string;
  public mileageInKm: string;
  public category: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
  public transmission: '0' | '0' | '1';
  public color: string;
  public upholstery: '0' | '0' | '1' | '2' | '3';
  public fuelType: '0' | '0' | '1' | '2' | '3' | '4' | '5';
  public numSeats: number;
  public doors: '0' | '0' | '1' | '2';
  public engineSizeInCcm: number;
  public enginePowerInHp: number;
  public dimensionWidthInCm: number;
  public dimensionHeightInCm: number;
  public dimensionLengthInCm: number;
  public unloadedWeightInKg: number;
  public lastHu: string;
  public huReportExists: boolean;
  public numPreOwners: number;
  public numKeys: number;
  public vatIdReportable: boolean;
  public fullServiceHistory: boolean;
  public lastCheckAtMileage: number;
  public isReimportedVehicle: boolean;
  public euroNorm: string;
  public hadAccident: boolean;
  public accidentDescription: string;
  public additionalDamages: string;
  public damages: any;
  public isReadyToDrive: boolean;
  public vehicleCondition: number;
  public imageUrls: VehicleImages;
  public attachments: any;
  public urlToAttachment1: string;
  public urlToAttachment2: string;
  public urlToAttachment3: string;
  public urlToVehicleSummarySheet: string;
  public id: number;
  public ad: '0' | '0' | '1' | '2';
  public navigation: number;
  public headlights: '0' | '0' | '1' | '2' | '3';
  public coupling: '0' | '0' | '1' | '2';
  public vehicleHeater: '0' | '0' | '1' | '2';
  public parkingAssistance: '0' | '0' | '1' | '2' | '3';
  public sunRoof: number;
  public sportPackage: number;
  public additional: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
