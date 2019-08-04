import { Pipe, PipeTransform } from '@angular/core';

import { FuelType } from "../common/fuelType.const";

@Pipe({
  name: 'fuel'
})
export class FuelPipe implements PipeTransform {

  // as I'm not able to see the real data, I created a type for the fuel and here
  // I parse the proper display value.
  transform(value: number): string {
    return (FuelType.filter((fuel) =>{
      if(fuel.type === value) {
        return fuel;
      }
    })[0]).value;
  }

}
