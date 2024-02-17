import { Config } from "../core/config.ts"

export class Stage {
  option: { element?: HTMLElement }
  element: HTMLElement | null
  count: number = 0
  config: Config = new Config()
  posY: number = 0.2
  private _background: HTMLElement | null = null
  private _spectrum: string[] = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"]
  private _backgroundPositionY: number = 0

  constructor(option: any = {}) {
    this.option = option
    this.element = this.option.element || null

    if (!this.element) return

    const background: HTMLElement = document.createElement("div")
    background.classList.add("background")
    this.element.appendChild(background)
    this._background = background

    this._spectrum = this._spectrum.concat(this._spectrum.slice(0, -1).reverse())
    this.config.addParameter("posY", this.posY, { min: 0.01, max: 1, step: 0.01 })

    window.requestAnimationFrame(this._update.bind(this))
  }

  public getElement(): HTMLElement | null {
    return this.element
  }

  private _update(): void {
    if (this._background) {
      const colors: string = this._spectrum.join(",")
      this._background.style.backgroundImage = `linear-gradient(to bottom, ${colors})`

      this.posY = this.config.parameters.posY
      this._backgroundPositionY += this.posY
      if (this._backgroundPositionY >= 200) this._backgroundPositionY = 0
      this._background.style.backgroundPositionY = `${this._backgroundPositionY}%`
    }
    this.count++
    window.requestAnimationFrame(this._update.bind(this))
  }
}