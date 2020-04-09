import { StandardProtocol } from '../Models/StandardProtocol';
import * as moment from 'moment';
import { ProtocolPhase } from '../Models/ProtocolPhase';

export abstract class Calculators {



  public static totalContrastVolume(protocol: StandardProtocol) {
    let vol = 0.0;

    if (protocol != null && protocol.phases.length > 0) {

      protocol.phases.forEach(phase => {
        if (phase.contrastRatio === undefined) { return; }
        const volume = phase.contrastRatio * phase.volume / 100;
        vol += volume;
      });
    }
    return Math.round(vol);
  }

  public static totalSalineVolume(protocol: StandardProtocol) {
    let vol = 0.0;

    if (protocol != null && protocol.phases.length > 0) {
      protocol.phases.forEach(phase => {
        if (phase.contrastRatio === undefined) { return; }
        const volume = phase.volume - (phase.contrastRatio * phase.volume / 100);
        vol += volume;
      });
    }
    return Math.round(vol);
  }

  public static ticksToDate(ticks: number) {

    const duration = moment.duration();
    const seconds = moment(ticks / 10000).seconds();
    const minutes = moment(ticks / 10000).minutes();
    duration.add(seconds, 'seconds');
    duration.add(minutes, 'minutes');


    return moment.utc(duration.asMilliseconds()).format('mm:ss');
  }

  public static secondsToDate(seconds: number) {
    const duration = moment.duration();
    duration.add(seconds, 'seconds');
    return moment.utc(duration.asMilliseconds()).format('mm:ss');
  }

  public static totalDuration(protocol: StandardProtocol): string {
    const duration = moment.duration();

    if (protocol != null && protocol.phases.length > 0) {
      protocol.phases.forEach(phase => {
        if (phase.type === 3) {
          duration.add(phase.pauseSeconds, 'seconds');
        } else {
          const seconds = moment(phase.durationTicks / 10000).seconds();
          const minutes = moment(phase.durationTicks / 10000).minutes();
          duration.add(seconds, 'seconds');
          duration.add(minutes, 'minutes');
        }
      });
    }
    return duration.hours() + ':' + duration.minutes() + ':' + duration.seconds();
  }

  public static transformTicksToDate(ticks: number): Date {

    let epochTicks = 621355968000000000,    // the number of .net ticks at the unix epoch
      ticksPerMillisecond = 10000,        // there are 10000 .net ticks per millisecond
      jsTicks = 0,                        // ticks in javascript environment
      jsDate,                             // Date in javascript environment
      input = ticks;

    jsTicks = (input - epochTicks) / ticksPerMillisecond;

    jsDate = new Date(jsTicks); // N.B. Js applies local timezone in automatic

    return jsDate;
  }

  public static calculatePhaseDuration(phase: ProtocolPhase) {

    const totalVolume = phase.volume;
    const rate = phase.flowRate;
    const seconds = (totalVolume / rate); // seconds here;
    console.log('seconds after phase calculation ' + seconds);
    const durationTicks = (seconds * 1000 * 10000) + 621355968000000000;
    // milliseconds-> ticks -> unix ticks
    return durationTicks;
  }

  public static numpadTimeToCSharpTicks(timeString: string) {

    const duration = moment.duration();
    const timeParts = timeString.split(':');
    const seconds = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[0]);
    const secondsDate = new Date(1970, 0, 1); // Epoch
    secondsDate.setSeconds(seconds);
    secondsDate.setMinutes(minutes);
    const converted = ((secondsDate.getTime() * 10000) + 621355968000000000);
    console.log('converted TICKS from ' + timeString + ' is ' + converted);
    return converted;
  }

  public static numpadTimeToSeconds(timeString: string) {

    const duration = moment.duration();
    const timeParts = timeString.split(':');
    const seconds = parseInt(timeParts[1]);
    const minutes = parseInt(timeParts[0]);
    const secondsDate = new Date(1970, 0, 1); // Epoch
    secondsDate.setSeconds(seconds);
    secondsDate.setMinutes(minutes);
    const converted = Math.round(secondsDate.getTime() / 1000);
    console.log('converted SECONDS from' + timeString + ' is ' + converted);
    return converted;
  }
}
