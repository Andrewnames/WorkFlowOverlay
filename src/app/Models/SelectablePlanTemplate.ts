export class SelectablePlanTemplate {

  constructor() {

  }

  private _isSelected: boolean;
  public get isSelected(): boolean {
    return this._isSelected;
  }
  public set isSelected(v: boolean) {
    this._isSelected = v;
  }


  private _isEnabled: boolean;
  public get isEnabled(): boolean {
    return this._isEnabled;
  }
  public set isEnabled(v: boolean) {
    this._isEnabled = v;
  }


}
