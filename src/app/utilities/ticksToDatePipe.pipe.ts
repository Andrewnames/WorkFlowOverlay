import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticksToDatePipe'
})
export class TicksToDatePipePipe implements PipeTransform {

  transform(ticks: number, timeType?: number): Date {

    if (timeType === 2) { // case for seconds, not ticks
      const secondsDate = new Date(1970, 0, 1); // Epoch
      secondsDate.setSeconds(ticks);
      return secondsDate;
    } else {
      let epochTicks = 621355968000000000,    // the number of .net ticks at the unix epoch
        ticksPerMillisecond = 10000,        // there are 10000 .net ticks per millisecond
        jsTicks = 0,                        // ticks in javascript environment
        jsDate,                             // Date in javascript environment
        input = ticks;

      if (ticks < epochTicks) { // duration delta case
        jsTicks = (epochTicks + input ) / ticksPerMillisecond;

      } else {
        jsTicks = (input - epochTicks) / ticksPerMillisecond;
      }

      console.log('ticks came to convertion in pipe are ' + jsTicks);
      jsDate = new Date(jsTicks); // N.B. Js applies local timezone in automatic

      return jsDate;
    }
  }

}
