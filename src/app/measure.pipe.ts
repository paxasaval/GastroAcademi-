import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'measure'
})
export class MeasurePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === 0.5){
      return "1/2"
    }
    return null;
  }

}
