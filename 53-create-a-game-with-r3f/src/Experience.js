import { Debug, Physics } from "@react-three/rapier"
import {Level} from "./Level.js"
import Lights from "./Lights.js"
import Player from "./Player.js"

export default function Experience() {
   return (
      <>
         <Physics>
            {/* <Debug /> */}
            <Lights />
            <Level/>
            <Player />
         </Physics>
      </>
   )
}
