import { Deserializable } from './deserializable.model';
import { Image } from './image.model'

export class Vehicle {
  public id: number;
  public mileageInKm: number;
  public ez: string;
  public fuelType: number;
  public transmission: number;
  public vehicleImages: Image;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
