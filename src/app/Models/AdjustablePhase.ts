import { ProtocolPhase } from './ProtocolPhase';

export class AdjustablePhase extends ProtocolPhase {

  constructor(phase: ProtocolPhase) {
    super();
    super.contrastRatio = phase.contrastRatio;

    super.flowRate = phase.flowRate;
    super.orderIndex = phase.orderIndex;
    super.pauseSeconds = phase.pauseSeconds;
    super.type = phase.type;
    super.volume = phase.volume;

    if (phase.type === 3) { // pause
      this.durationBornValue = phase.pauseSeconds;
      super.durationTicks = phase.pauseSeconds;

    } else {
      this.durationBornValue = phase.durationTicks;
      super.durationTicks = phase.durationTicks;
    }

    this.volumeBornValue = phase.volume;
    this.flowRateBornValue = phase.flowRate;

  }

  calculateDeltas() {
    this.flowRateDelta = Math.round(this.flowRate - this.flowRateBornValue);
    this.volumeDelta = Math.round(this.volume - this.volumeBornValue);
    if (this.type === 3) {
      this.durationDelta =  this.pauseSeconds - this.durationBornValue ;

    } else {
      this.durationDelta =  this.durationTicks - this.durationBornValue ;

    }
    console.log('duration delta is ' + this.durationDelta);
  }


  private _durationBornValue: number;
  public get durationBornValue(): number {
    return this._durationBornValue;
  }
  public set durationBornValue(v: number) {
    this._durationBornValue = v;
  }

  private _volumeBornValue: number;
  public get volumeBornValue(): number {
    return this._volumeBornValue;
  }
  public set volumeBornValue(v: number) {
    this._volumeBornValue = v;
  }

  private _flowRateBornValue: number;
  public get flowRateBornValue(): number {
    return this._flowRateBornValue;
  }
  public set flowRateBornValue(v: number) {
    this._flowRateBornValue = v;
  }

  private _volumeDelta: number;
  public get volumeDelta(): number {
    return this._volumeDelta;
  }
  public set volumeDelta(v: number) {
    this._volumeDelta = v;
  }

  private _flowRateDelta: number;
  public get flowRateDelta(): number {
    return this._flowRateDelta;
  }
  public set flowRateDelta(v: number) {
    this._flowRateDelta = v;
  }

  private _durationDelta: number;
  public get durationDelta(): number {
    return this._durationDelta;
  }
  public set durationDelta(v: number) {
    this._durationDelta = v;
  }

}
