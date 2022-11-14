import Experience from "../Experience"
import * as THREE from "three"
import Environment from "./Environment"
import Floor from "./Floor"

export default class World {
   constructor() {
      this.experience = new Experience()
      this.scene = this.experience.scene
      this.resources = this.experience.resources

      this.resources.on("ready", () => {
         this.floor = new Floor()
         this.environment = new Environment()
      })

   }
}