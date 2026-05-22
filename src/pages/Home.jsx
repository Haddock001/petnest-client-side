import React from 'react'
import Button from '../shared/Button'
import cover from '../assets/cover.png'

const Home = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-(--pet-gradient-start) to-(--pet-gradient-end)">
      <div className='flex flex-col justify-center items-center px-[24px]'>
        <div className='text-center'>
          <h1 className='font-ruslan mt-30 text-[84px] lg:text-[250px] text-(--pet-accent)'>PETNEST</h1>
          <h1 className='text-(--pet-secondary) text-6xl tracking-wide font-bold'>Because They<br/> Deserve The Best</h1>
          <h1 className='mt-2.5 font-jockey text-2xl text-(--pet-dark)'>Discover trusted tips, loving homes and<br/> quality pet services</h1>
        </div>
        <Button className='mt-4'>Get Started</Button>
      </div>
      <img src={cover} alt="" className='w-full lg:w-186' />
    </div>
  )
}

export default Home