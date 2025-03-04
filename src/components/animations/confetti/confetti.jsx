import React from 'react'
import Lottie from 'lottie-react'
import ConfettiJSON from './confetti.json'

export default function ConfettiAnimation() {
  return <Lottie animationData={ConfettiJSON} loop={false} className='size-80 absolute -bottom-48' />
}
