import Experience from "../Experience"

export default class {
   constructor() {
      this.experience = new Experience()
      this.scene = this.experience.scene
      this.resources = this.experience.resources
      this.resource = this.resources.items.foxModel

      this.setModel()
   }

   setModel() {
      this.model = this.resource.scene
      console.log(this.model)
   }
}