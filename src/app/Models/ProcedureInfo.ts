import { ProtocolPlan } from "./ProtocolPlan";
import { PatientModalityTableEntry } from "./PatientModalityTableEntry";

export class ProcedureInfo {

  private _protocolPlan: ProtocolPlan;
  public get protocolPlan(): ProtocolPlan {
    return this._protocolPlan;
  }
  public set protocolPlan(v: ProtocolPlan) {
    this._protocolPlan = v;
  }


  private _patientInfo: PatientModalityTableEntry;
  public get patientInfo(): PatientModalityTableEntry {
    return this._patientInfo;
  }
  public set patientInfo(v: PatientModalityTableEntry) {
    this._patientInfo = v;
  }




  private _catheterPlacement: string;
  public get catheterPlacement(): string {
    return this._catheterPlacement;
  }
  public set catheterPlacement(v: string) {
    this._catheterPlacement = v;
  }


  private _catheterType: string;
  public get catheterType(): string {
    return this._catheterType;
  }
  public set catheterType(v: string) {
    this._catheterType = v;
  }


  private _contrast: string;
  public get contrast(): string {
    return this._contrast;
  }
  public set contrast(v: string) {
    this._contrast = v;
  }


  private _eGfr : number;
  public get eGfr() : number {
    return this._eGfr;
  }
  public set eGfr(v : number) {
    this._eGfr = v;
  }

private _kVp : number;
public get kVp() : number {
  return this._kVp;
}
public set kVp(v : number) {
  this._kVp = v;
}
}

