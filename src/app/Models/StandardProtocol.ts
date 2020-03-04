import { Guid } from 'guid-typescript';
import { ProtocolPhase } from "./ProtocolPhase";
export class StandardProtocol {


  private _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }

  private _uniqueId: Guid;
  public get uniqueId(): Guid {
    return this._uniqueId;
  }
  public set uniqueId(v: Guid) {
    this._uniqueId = v;
  }


  private _pressureLimit: number;
  public get pressureLimit(): number {
    return this._pressureLimit;
  }
  public set pressureLimit(v: number) {
    this._pressureLimit = v;
  }

  private _isTestInjection: boolean;
  public get isTestInjection(): boolean {
    return this._isTestInjection;
  }
  public set isTestInjection(v: boolean) {
    this._isTestInjection = v;
  }




  private _phases: ProtocolPhase[];
  public get phases(): ProtocolPhase[] {
    return this._phases;
  }
  public set phases(v: ProtocolPhase[]) {
    this._phases = v;
  }

}
