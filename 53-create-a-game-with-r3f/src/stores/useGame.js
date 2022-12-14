import create from "zustand"
import {subscribeWithSelector} from "zustand/middleware"

export default create(subscribeWithSelector((set)=>{

   return {
      blocksCount: 3,
      blocksSeed: 0,
      startTime: 0,
      endTime: 0,
      phase: "ready",
      start: () =>{
         set((state) => {
            if(state.phase === "playing"){
               return {}
            }
            return {
               phase: "playing",
               startTime: Date.now()
            }
         })
      },
      restart: () =>{
         set((state) => {
            if(state.phase === "ready"){
               return {}
            }
            return {
               phase: "ready",
               blocksSeed: Math.random()
            }
         })
      },
      end: () =>{
         set((state) => {
            if(state.ended === "ended"){
               return {}
            }
            return {
               phase: "ended",
               endTime: Date.now()
            }
         })
      },
   }
}))