import React from 'react'
import PetCard from './PetCard'
import Button from '../shared/Button'
import HowItWorks from './HowItWorks'

const BrowsePets = () => {
  return (
    <div className='min-h-screen bg-pet-primary scroll-section flex flex-col items-center justify-center'>
          <div className='mt-20 mb-10'>
              <h1 className='text-5xl font-poppins font-bold text-center text-(--pet-secondary)'>Featured Pets</h1>
          </div>
          <div className='flex flex-col lg:flex-row items-center gap-15'>
              <PetCard></PetCard>
              <PetCard></PetCard>
              <PetCard></PetCard>
          </div>
          <Button className='mt-10'>Browse More</Button>
    </div>
  )
}

export default BrowsePets