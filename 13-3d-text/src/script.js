import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from "three/examples/jsm/loaders/FontLoader"
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry"

const gui = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load("/textures/matcaps/1.png")

const fontLoader = new FontLoader()
fontLoader.load(
   "/fonts/helvetiker_regular.typeface.json",
   (font)=>{
      console.log("Font loaded")
      const textGeomtry = new TextGeometry(
         "Hello Three.js",
         {
            font,
            size: 0.5,
            height: 0.2,
            curveSegments: 6,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
         }
      )
      // textGeomtry.computeBoundingBox()
      // textGeomtry.translate(
      //    - textGeomtry.boundingBox.max.x * 0.5,
      //    - textGeomtry.boundingBox.max.y * 0.5,
      //    - textGeomtry.boundingBox.max.z * 0.5,
      // )
      textGeomtry.center()

      const textMaterial = new THREE.MeshMatcapMaterial({
         matcap: matcapTexture
      })
      const text = new THREE.Mesh(textGeomtry, textMaterial)
      scene.add(text)

      new Array(100).forEach(_=>{console.log("test")})
   }
)

// const cube = new THREE.Mesh(
//    new THREE.BoxGeometry(1, 1, 1),
//    new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

const sizes = {
   width: window.innerWidth,
   height: window.innerHeight
}

window.addEventListener('resize', () => {
   sizes.width = window.innerWidth
   sizes.height = window.innerHeight

   camera.aspect = sizes.width / sizes.height
   camera.updateProjectionMatrix()

   renderer.setSize(sizes.width, sizes.height)
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)


const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

const renderer = new THREE.WebGLRenderer({
   canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () => {
   const elapsedTime = clock.getElapsedTime()

   controls.update()
   renderer.render(scene, camera)
   window.requestAnimationFrame(tick)
}

tick()