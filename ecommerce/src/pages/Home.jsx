import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection';
import CategoryTab from '../components/CategoryTab';
import FlashSale from '../components/FlashSale';
import TodayForYou from '../components/TodayForYou';
import Footer from '../components/Footer';


function Home() {
  return (
    <>
     <Navbar />
      <HeroSection/>
      <CategoryTab />
      <FlashSale/>
      <TodayForYou/>
      <Footer />
    </>
  )
}

export default Home