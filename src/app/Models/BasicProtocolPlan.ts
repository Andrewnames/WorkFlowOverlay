import { Guid } from 'guid-typescript';
import { AnatomicalRegion } from "./AnatomicalRegion.enum";
export class BasicProtocolPlan {




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




  private _Id: Guid;
  public get Id(): Guid {
    return this._Id;
  }
  public set Id(v: Guid) {
    this._Id = v;
  }


  private _anatomicalRegion: AnatomicalRegion;
  public get anatomicalRegion(): AnatomicalRegion {
    return this._anatomicalRegion;
  }
  public set anatomicalRegion(v: AnatomicalRegion) {
    this._anatomicalRegion = v;
  }


  constructor() {

  }


}
