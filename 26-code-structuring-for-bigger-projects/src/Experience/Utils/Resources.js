import EventEmitter from "./EventEmitter"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from "three"

export default class Resources extends EventEmitter {
   constructor(sources) {
      super()
      this.sources = sources

      this.items = {}
      this.toLoad = this.sources.length
      this.loaded = 0

      this.setLoaders()
   }

   setLoaders() {
      this.loaders = {}
      this.loaders.gltfLoader = new GLTFLoader()
      this.loaders.textureLoader = new THREE.TextureLoader()
      this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
   }
}