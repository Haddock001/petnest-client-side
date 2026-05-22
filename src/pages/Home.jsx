import React from 'react'
import Button from '../shared/Button'
import cover from '../assets/cover.png'
import BrowsePets from '../components/BrowsePets'

const Home = () => {
  return (
    <div>
      <div className="min-h-screen bg-linear-to-b from-(--pet-gradient-start) to-(--pet-gradient-end) relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center pt-12 lg:pt-20">
            <h2 className="text-(--pet-secondary) text-4xl lg:text-7xl tracking-wide font-poppins font-bold">Because They<br /> Deserve The Best</h2>
            <p className="mt-4 text-(--pet-dark) text-base lg:text-2xl">Discover trusted tips, loving homes and<br /> quality pet services</p>
            <Button className="mt-6">Get Started</Button>
          </div>
        </div>

        {/* Large background PETNEST text - only visible on lg, placed visually below the header */}
        <h1 style={{ color: 'var(--pet-accent)' }} className="absolute left-1/2 transform -translate-x-1/2 text-[220px] leading-none font-ruslan opacity-90 z-0 select-none">PETNEST</h1>

        {/* Cover image centered and overlapping the PETNEST text */}
        <div className="flex justify-center relative z-10 mt-60 lg:mt-0">
          <img src={cover} alt="" className="w-full max-w-[760px] lg:max-w-[920px]" />
        </div>
      </div>
      <BrowsePets></BrowsePets>
    </div>
  )
}

export default Home