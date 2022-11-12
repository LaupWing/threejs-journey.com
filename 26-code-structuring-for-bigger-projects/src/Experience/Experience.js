import Sizes from "./Utils/Sizes"

export default class Experience {
   constructor(canvas) {
      window.experience = this
      this.canvas = canvas
      this.sizes = new Sizes()
   }
}