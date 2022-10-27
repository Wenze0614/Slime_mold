import React from 'react'
import video from "./assets/slime_mould_full.mp4"
// import gif from "./assets/explosion.gif"
// import shading from './assets/shading.png'
import './Main.css'

export default function Main() {
  return (
    <div className='main'>
        <video src={video} autoPlay loop muted/>
        <div className="overlay"></div>
        {/* <img src={shading} alt="shading"></img> */}
        {/* <img src={gif} alt="background"></img> */}
    </div>
  )
}
