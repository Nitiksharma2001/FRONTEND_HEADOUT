import React from 'react'
import SadJSON from './sad.json'
import Lottie from 'lottie-react'

export default function SadAnimation() {
    return <Lottie animationData={SadJSON} loop={false} className='size-40 absolute left-60 top-80'/>
  }
