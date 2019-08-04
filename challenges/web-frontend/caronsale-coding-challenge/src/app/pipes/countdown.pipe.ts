import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {

  transform(value: number): any {
    let displayTime = new Date(value * 1000).toISOString().substr(11, 8);
    displayTime = displayTime.slice(0, 2) + 'h' + displayTime.slice(2, 5) + 'm' + displayTime.slice(5, 9) + 's';

    return displayTime;
  }

}
