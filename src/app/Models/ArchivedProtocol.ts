import { Guid } from "guid-typescript";
import { ProtocolPlan } from "./ProtocolPlan";
export class ArchivedProtocol {



  private _id: Guid;
  public get id(): Guid {
    return this._id;
  }
  public set id(v: Guid) {
    this._id = v;
  }


  private _studyName: string;
  public get studyName(): string {
    return this._studyName;
  }
  public set studyName(v: string) {
    this._studyName = v;
  }


  private _studyDescription: string;
  public get studyDescription(): string {
    return this._studyDescription;
  }
  public set studyDescription(v: string) {
    this._studyDescription = v;
  }

  private _studyDate: Date;
  public get studyDate(): Date {
    return this._studyDate;
  }
  public set studyDate(v: Date) {
    this._studyDate = v;
  }


  private _weight: number;
  public get weight(): number {
    return this._weight;
  }
  public set weight(v: number) {
    this._weight = v;
  }


  private _kvp: number;
  public get kvp(): number {
    return this._kvp;
  }
  public set kvp(v: number) {
    this._kvp = v;
  }



  private _protocolPlan: ProtocolPlan;
  public get protocolPlan(): ProtocolPlan {
    return this._protocolPlan;
  }
  public set protocolPlan(v: ProtocolPlan) {
    this._protocolPlan = v;
  }





}
