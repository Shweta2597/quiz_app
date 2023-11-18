import React, { useEffect, useState } from 'react'

export default function Questiontimer({timeout,onTimeout}) {

    const[remainingTime,setRemainingTime] = useState(timeout);

    useEffect(()=>{
        console.log("SETTING TIMEOUT")
        const timer = setTimeout(() => {
            onTimeout()
        }, timeout);
        return ()=>{
            clearTimeout(timer)
        }
    },[timeout,onTimeout])

    useEffect(()=>{
        console.log("SETTING INTERVAL")
        const timer = setInterval(()=>{
            setRemainingTime((prevRemainingTime)=>
                prevRemainingTime-100)
        },100)
        return ()=>{
            clearTimeout(timer)
        }
    },[])

  return (
    <progress id="questime-time" max={timeout} value={remainingTime}/>
        )
}
