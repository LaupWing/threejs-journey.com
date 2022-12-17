import create from "zustand"
import {subscribeWithSelector} from "zustand/middleware"

export default create(subscribeWithSelector((set)=>{

   return {
      blocksCount: 3,
      phase: "ready",
      start: () =>{
         set((state) => {
            if(state.phase === "playing"){
               return {}
            }
            return {
               phase: "playing"
            }
         })
      },
      restart: () =>{
         set((state) => {
            if(state.phase === "ready"){
               return {}
            }
            return {
               phase: "ready"
            }
         })
      },
      end: () =>{
         set((state) => {
            if(state.ended === "ended"){
               return {}
            }
            return {
               phase: "ended"
            }
         })
      },
   }
}))