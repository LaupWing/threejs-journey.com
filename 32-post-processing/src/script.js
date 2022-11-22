import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import * as dat from "lil-gui"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader"
// import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader"
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader"
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass"

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector("canvas.webgl")

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureLoader = new THREE.TextureLoader()

/**
 * Update all materials
 */
const updateAllMaterials = () => {
   scene.traverse((child) => {
      if (
         child instanceof THREE.Mesh &&
         child.material instanceof THREE.MeshStandardMaterial
      ) {
         child.material.envMapIntensity = 2.5
         child.material.needsUpdate = true
         child.castShadow = true
         child.receiveShadow = true
      }
   })
}

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
   "/textures/environmentMaps/0/px.jpg",
   "/textures/environmentMaps/0/nx.jpg",
   "/textures/environmentMaps/0/py.jpg",
   "/textures/environmentMaps/0/ny.jpg",
   "/textures/environmentMaps/0/pz.jpg",
   "/textures/environmentMaps/0/nz.jpg",
])
environmentMap.encoding = THREE.sRGBEncoding

scene.background = environmentMap
scene.environment = environmentMap

/**
 * Models
 */
gltfLoader.load("/models/DamagedHelmet/glTF/DamagedHelmet.gltf", (gltf) => {
   gltf.scene.scale.set(2, 2, 2)
   gltf.scene.rotation.y = Math.PI * 0.5
   scene.add(gltf.scene)

   updateAllMaterials()
})

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 3)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 3, -2.25)
scene.add(directionalLight)

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

   effectComposer.setSize(sizes.width, sizes.height)
   effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
   75,
   sizes.width / sizes.height,
   0.1,
   100
)
camera.position.set(4, 1, -4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGL1Renderer({
   canvas: canvas,
   antialias: true,
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 1.5
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Our own rendertarget

const renderTarget = new THREE.WebGL3DRenderTarget(800, 600, {
   samples: renderer.getPixelRatio() === 1 ? 2 : 0,
})

const effectComposer = new EffectComposer(renderer)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(sizes.width, sizes.height)

const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

const dotScreenPass = new DotScreenPass()
dotScreenPass.enabled = false
effectComposer.addPass(dotScreenPass)

const glitchPass = new GlitchPass()
glitchPass.enabled = true
effectComposer.addPass(glitchPass)

const rgbShiftPass = new ShaderPass(RGBShiftShader)
effectComposer.addPass(rgbShiftPass)
rgbShiftPass.enabled = false

// const unrealBloomPass = new UnrealBloomPass()
// effectComposer.addPass(unrealBloomPass)
// unrealBloomPass.enabled = false

// gui.add(unrealBloomPass, "enabled")
// gui.add(unrealBloomPass, "strength").min(0).max(2).step(0.001)
// gui.add(unrealBloomPass, "radius").min(0).max(2).step(0.001)
// gui.add(unrealBloomPass, "threshold").min(0).max(1).step(0.001)

const TintShader = {
   uniforms: {
      tDiffuse: { value: null },
      uTint: { value: null },
   },
   vertextShader: `
      varying vec2 vUv;

      void main(){
         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

         vUv = uv;
      }
   `,
   fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec3 uTint;

      void main(){
         vec4 color = texture2D(tDiffuse, vUv);
         color.r += 0.1;
         gl_FragColor = color;
      }
   `,
}

const tintPass = new ShaderPass(TintShader)
tintPass.material.uniforms.uTint.value = new THREE.Vector3()
effectComposer.addPass(tintPass)

gui.add(tintPass.material.uniforms.uTint.value, "x")
   .min(-1)
   .max(1)
   .step(0.001)
   .name("red")
gui.add(tintPass.material.uniforms.uTint.value, "y")
   .min(-1)
   .max(1)
   .step(0.001)
   .name("green")
gui.add(tintPass.material.uniforms.uTint.value, "z")
   .min(-1)
   .max(1)
   .step(0.001)
   .name("blue")

const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader)
effectComposer.addPass(gammaCorrectionShader)

if (renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2) {
   const smaaPass = new SMAAPass()
   effectComposer.addPass(smaaPass)
}

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
   const elapsedTime = clock.getElapsedTime()
   // Update controls
   controls.update()

   // Render
   // renderer.render(scene, camera)
   effectComposer.render()

   // Call tick again on the next frame
   window.requestAnimationFrame(tick)
}

tick()
