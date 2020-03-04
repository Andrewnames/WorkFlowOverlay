import { Guid } from 'guid-typescript';
import { AnatomicalRegion } from './AnatomicalRegion.enum';
import { StandardProtocol } from './StandardProtocol';
export class ProtocolPlan {

  constructor() {
    this.standardProtocols = [];
  }
  private _uniqueId: Guid;
  public get uniqueId(): Guid {
    return this._uniqueId;
  }
  public set uniqueId(v: Guid) {
    this._uniqueId = v;
  }


  private _name: string;
  public get name(): string {
    return this._name;
  }
  public set name(v: string) {
    this._name = v;
  }

  private _description: string;
  public get description(): string {
    return this._description;
  }
  public set description(v: string) {
    this._description = v;
  }


  private _orderIndex: number;
  public get orderIndex(): number {
    return this._orderIndex;
  }
  public set orderIndex(v: number) {
    this._orderIndex = v;
  }

  private _displayIndex: number;
  public get displayIndex(): number {
    return this._displayIndex;
  }
  public set displayIndex(v: number) {
    this._displayIndex = v;
  }

  private _anatomicalRegion: string;
  public get anatomicalRegion(): string {
    return this._anatomicalRegion;
  }
  public set anatomicalRegion(v: string) {
    this._anatomicalRegion = v;
  }

  private _standardProtocols: StandardProtocol[];

  public get standardProtocols(): StandardProtocol[] {
    return this._standardProtocols;
  }
  public set standardProtocols(v: StandardProtocol[]) {
    this._standardProtocols = v;
  }



}
