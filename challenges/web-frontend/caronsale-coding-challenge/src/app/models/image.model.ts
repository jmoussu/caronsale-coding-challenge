import { Deserializable } from './deserializable.model';

export class Image {
  public url: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
