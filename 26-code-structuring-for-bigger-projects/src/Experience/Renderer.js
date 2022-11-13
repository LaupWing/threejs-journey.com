import Experience from "./Experience";


export default class Renderer {
   constructor() {
      this.experience = new Experience()
      this.canvas = this.experience.canvas
      this.sizes = this.experience.sizes

   }
}