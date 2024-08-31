import React from 'react'
import HeroImg from '../assets/img/image.png'

function HeroSection() {
  return (
    <div className="heroSection">
        <img className='w-full md:max-h-[300px] object-cover max-h-[150px]' src={HeroImg} alt="" />
    </div>
  )
}

export default HeroSection