import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absoluteValue'
})
export class AbsoluteValuePipe implements PipeTransform {

  transform(value: any): any {
    return Math.abs(value);
  }
}
