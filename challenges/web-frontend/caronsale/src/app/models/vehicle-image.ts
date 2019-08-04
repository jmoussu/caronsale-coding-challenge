import { Deserializable } from './deserializable';

export class VehicleImage implements Deserializable {
  public perspective: number;
  public _fk_associatedVehicle: number;
  public mimeType: string;
  public encoding: string;
  public rawData: any;
  public url: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
