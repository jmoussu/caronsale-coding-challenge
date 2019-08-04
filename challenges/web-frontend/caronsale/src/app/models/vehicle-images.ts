import { Deserializable } from './deserializable';
import { VehicleImage } from './vehicle-image';

export class VehicleImages implements Deserializable {
  public leftSide: VehicleImage;
  public leftSideBack: VehicleImage;
  public rightSide: VehicleImage;
  public interior: VehicleImage;
  public front: VehicleImage;
  public rightSideBack: VehicleImage;
  public back: VehicleImage;
  public trunk: VehicleImage;
  public other1: VehicleImage;
  public other2: VehicleImage;
  public other3: VehicleImage;
  public other4: VehicleImage;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
