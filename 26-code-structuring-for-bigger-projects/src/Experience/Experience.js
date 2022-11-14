import * as THREE from "three"
import Camera from "./Camera"
import Renderer from "./Renderer"
import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"

let instance

export default class Experience {
   constructor(canvas) {

      if (instance) {
         return instance
      }
      instance = this
      window.experience = this

      this.canvas = canvas

      this.sizes = new Sizes()
      this.time = new Time()
      this.scene = new THREE.Scene()
      this.camera = new Camera()
      this.renderer = new Renderer()

      this.sizes.on("resize", () => {
         this.resize()
      })

      this.time.on("tick", () => {
         this.update()
      })
   }

   resize() {
      this.camera.resize()
      this.renderer.resize()
   }

   update() {
      this.camera.update()
   }
}