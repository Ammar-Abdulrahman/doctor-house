//import React from 'react'
// import Lottie from "lottie-react"
// import AppLoaderAnimation from '@Assets/json/AppLoader.json'
import { LinearProgress } from '@mui/material'

 const AppLoader = () => {

  return (
    // <div style = {{marginLeft:"530px" , marginTop:"100px" , height:"450px" , width:"450px"}} >
      <div>
        <LinearProgress color="info" />
        {/* <Lottie loop={false} autoPlay={true} animationData={AppLoaderAnimation} /> */}
        </div>
    // </div>
  )
}

export default AppLoader;