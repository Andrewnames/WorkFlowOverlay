import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticksToDatePipe'
})
export class TicksToDatePipePipe implements PipeTransform {

  transform(ticks: number, exponent?: number): Date {

    let epochTicks = 621355968000000000,    // the number of .net ticks at the unix epoch
      ticksPerMillisecond = 10000,        // there are 10000 .net ticks per millisecond
      jsTicks = 0,                        // ticks in javascript environment
      jsDate,                             // Date in javascript environment
      input = ticks;

    jsTicks = (input - epochTicks) / ticksPerMillisecond;

    jsDate = new Date(jsTicks); // N.B. Js applies local timezone in automatic

    return jsDate;
  }

}
