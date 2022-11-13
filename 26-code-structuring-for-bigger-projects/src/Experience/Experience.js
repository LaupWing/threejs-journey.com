import * as THREE from "three"
import Camera from "./Camera"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"

export default class Experience {
   constructor(canvas) {
      window.experience = this

      this.canvas = canvas

      this.sizes = new Sizes()
      this.time = new Time()
      this.scene = new THREE.Scene()
      this.camera = new Camera()

      this.sizes.on("resize", () => {
         this.resize()
      })

      this.time.on("tick", () => {
         this.update()
      })
   }

   resize() {

   }

   update() {

   }
}