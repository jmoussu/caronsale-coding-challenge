import { Deserializable } from './deserializable';

export class VehicleValuation implements Deserializable{
  public originalPrice: number;
  public purchasePrice: number;
  public basePrice: number;
  public salesPrice: number;
  public equipmentPrice: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
