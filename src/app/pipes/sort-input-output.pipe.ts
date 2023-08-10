import { Pipe, PipeTransform } from '@angular/core';
import { InputOutput } from '../models/input-output.model';

@Pipe({
  name: 'sortInputOutput'
})
export class SortInputOutputPipe implements PipeTransform {

  transform(items: InputOutput[]): InputOutput[] {
    return items.sort((a, b) => {
      console.log(a)
      if (a.type == 'Ingreso') {
        return -1
      } else {
        return 1
      }
    })
  }

}
