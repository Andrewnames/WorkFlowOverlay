import { PhaseType } from "./PhaseType.enum";
export class ProtocolPhase {

  private _flowRate: number;
  public get flowRate(): number {
    return this._flowRate;
  }
  public set flowRate(v: number) {
    this._flowRate = v;
  }

  private _volume: number;
  public get volume(): number {
    return this._volume;
  }
  public set volume(v: number) {
    this._volume = v;
  }

  private _contrastRatio: number;
  public get contrastRatio(): number {
    return this._contrastRatio;
  }
  public set contrastRatio(v: number) {
    this._contrastRatio = v;
  }

  private _pauseSeconds: number;
  public get pauseSeconds(): number {
    return this._pauseSeconds;
  }
  public set pauseSeconds(v: number) {
    this._pauseSeconds = v;
  }

  private _durationTicks: number;
  public get durationTicks(): number {
    return this._durationTicks;
  }
  public set durationTicks(v: number) {
    this._durationTicks = v;
  }

  private _type: PhaseType;
  public get type(): PhaseType {
    return this._type;
  }
  public set type(v: PhaseType) {
    this._type = v;
  }

}
