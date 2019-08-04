import { Pipe, PipeTransform } from '@angular/core';

import { TransmissionType } from "../common/transmissionType.const";

@Pipe({
  name: 'transmission'
})
export class TransmissionPipe implements PipeTransform {

  // as I'm not able to see the real data, I created a type for the transmission and here
  // I parse the proper display value.
  transform(value: number): string {
    return (TransmissionType.filter((transmission) =>{
      if(transmission.type === value) {
        return transmission;
      }
    })[0]).value;
  }

}
