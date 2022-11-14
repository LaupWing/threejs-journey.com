import Experience from "../Experience"
import * as THREE from "three"

export default class {
   constructor() {
      this.experience = new Experience()
      this.scene = this.experience.scene
      this.resources = this.experience.resources
      this.resource = this.resources.items.foxModel

      this.setModel()
      this.setAnimation()
   }

   setModel() {
      this.model = this.resource.scene
      this.model.scale.set(0.02, 0.02, 0.02)
      this.scene.add(this.model)

      this.model.traverse(child => {
         if (child instanceof THREE.Mesh) {
            child.castShadow = true
         }
      })
   }

   setAnimation() {

   }
}