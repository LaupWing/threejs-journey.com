import "./style.css"
import * as dat from "lil-gui"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import firefliesVertexShader from "./shaders/fireflies/vertext.glsl"
import firefliesFragmentShader from "./shaders/fireflies/fragment.glsl"
import portalVertexShader from "./shaders/portal/vertext.glsl"
import portalFragmentShader from "./shaders/portal/fragment.glsl"

/**
 * Base
 */
// Debug
const debugObject = {}
const gui = new dat.GUI({
   width: 400,
})

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath("draco/")

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

const bakedTexture = textureLoader.load("baked2.jpg")
bakedTexture.flipY = false
bakedTexture.encoding = THREE.sRGBEncoding
// Model

const bakedMaterial = new THREE.MeshBasicMaterial({
   map: bakedTexture
})
const poleLightMaterial = new THREE.MeshBasicMaterial({
   color: 0xffffe5
})
const portalMaterial = new THREE.ShaderMaterial({
   uniforms:{
      uTime:{
         value: 0
      },
      uColorStart:{
         value: new THREE.Color(0xff0000)
      },
      uColorEnd:{
         value: new THREE.Color(0x0000ff)
      }
   },
   vertexShader: portalVertexShader,
   fragmentShader: portalFragmentShader,
})
gltfLoader.load(
   "portal2.glb", 
   (gltf) => {
      const bakedMesh = gltf.scene.children.find((child) => child.name === 'baked')
      const portalMesh = gltf.scene.children.find(x=>x.name === "portal") 
      const poleLightAMesh = gltf.scene.children.find(x=>x.name === "poleLightA") 
      const poleLightBMesh = gltf.scene.children.find(x=>x.name === "poleLightB") 

      poleLightAMesh.material = poleLightMaterial
      poleLightBMesh.material = poleLightMaterial
      portalMesh.material = portalMaterial
      bakedMesh.material = bakedMaterial

      scene.add(gltf.scene)
})

const fireFliesGeometry = new THREE.BufferGeometry()
const fireFliesCount = 30
const positionArray = new Float32Array(fireFliesCount * 3)
const scaleArray = new Float32Array(fireFliesCount)

for(let i = 0; i < fireFliesCount; i++){
   positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
   positionArray[i * 3 + 1] = Math.random() * 1.5
   positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4

   scaleArray[i] = Math.random()
}

fireFliesGeometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))
fireFliesGeometry.setAttribute("aScale", new THREE.BufferAttribute(positionArray, 1))

const firefliesMaterial = new THREE.ShaderMaterial({
   uniforms:{
      uPixelRatio: {
         value: Math.min(window.devicePixelRatio, 2)
      },
      uSize: {
         value: 100
      },
      uTime: {
         value: 0
      }
   },
   vertexShader: firefliesVertexShader,
   fragmentShader: firefliesFragmentShader,
   transparent: true,
   blending: THREE.AdditiveBlending,
   depthWrite: false
})

gui
   .add(firefliesMaterial.uniforms.uSize, "value")
   .min(0)
   .max(500)
   .step(1)
   .name("firefliesSize")

const fireflies = new THREE.Points(fireFliesGeometry, firefliesMaterial)
scene.add(fireflies)

/**
 * Sizes
 */
const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
}

window.addEventListener("resize", () => {
   // Update sizes
   sizes.width = window.innerWidth
   sizes.height = window.innerHeight

   // Update camera
   camera.aspect = sizes.width / sizes.height
   camera.updateProjectionMatrix()

   // Update renderer
   renderer.setSize(sizes.width, sizes.height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

   firefliesMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2)
   
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
   45,
   sizes.width / sizes.height,
   0.1,
   100
)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 4
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
   canvas: canvas,
   antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputEncoding = THREE.sRGBEncoding

debugObject.clearColor = "#201919"
renderer.setClearColor(debugObject.clearColor)
gui
   .addColor(debugObject, "clearColor")
   .onChange(()=>{
      renderer.setClearColor(debugObject.clearColor)
   })

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
   const elapsedTime = clock.getElapsedTime()

   firefliesMaterial.uniforms.uTime.value = elapsedTime
   portalMaterial.uniforms.uTime.value = elapsedTime

   // Update controls
   controls.update()

   // Render
   renderer.render(scene, camera)

   // Call tick again on the next frame
   window.requestAnimationFrame(tick)
}

tick()
