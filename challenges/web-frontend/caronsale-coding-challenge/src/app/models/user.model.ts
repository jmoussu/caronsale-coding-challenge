import { Deserializable } from './deserializable.model';

export class User {
    public token: number;
    public authenticated: boolean;
    public userId: string;
    public type: number;
    public privileges: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
