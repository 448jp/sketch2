import { Pane } from "tweakpane"

export class Config {
  private _pane: Pane | null
  parameters: any = {}

  constructor() {
    this._pane = new Pane()
  }

  public addParameter(key: string, value: any, option: any = {}): void {
    this.parameters[key] = value
    if (!this._pane) return
    this._pane.addBinding(this.parameters, key, option)
  }
}