import { Deserializable } from './deserializable';

export class AuthenticationResult implements Deserializable {
  public authenticated: boolean;
  public userId: string;
  public token: string;
  public type: '0' | '1' | '2' | '3' | '4';
  public privileges: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
