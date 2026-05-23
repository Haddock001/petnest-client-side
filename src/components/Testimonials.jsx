import React from 'react'
import TestimonialCard from '../shared/TestimonialCard'

const Testimonials = () => {
  return (
    <div className='flex flex-col scroll-section bg-pet-primary justify-center'>
        <div>
              <h1 className='text-poppins text-center mb-10 text-5xl font-extrabold text-(--pet-secondary)'>Testimonials: From Happy Pet Owners</h1>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 justify-center lg:px-35'>
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        </div>
    </div>
  )
}

export default Testimonials