import { useEffect } from "react";
import { useState } from "react";

export function useIsMobile(){
  const [isMobile,setIsMobile] = useState(window.matchMedia("(max-width:768px)").matches)

  useEffect(()=>{
    const mediaQuery = window.matchMedia("(max-width:768px)")
    const handleChange = (e)=> {
      console.log(e);
      setIsMobile(e.matches)}

    mediaQuery.addEventListener('change',handleChange)
    return ()=> mediaQuery.removeEventListener('change',handleChange)
  },[])
  return isMobile
}