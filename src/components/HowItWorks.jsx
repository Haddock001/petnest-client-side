import React from 'react'
import Testimonials from './Testimonials'

const HowItWorks = () => {
  return (
    <div className='bg-pet-primary py-20'>
        <div className='flex flex-col items-center justify-center'>
            <h1 className='font-poppins text-5xl font-extrabold text-center text-(--pet-secondary) mt-10 mb-10'>How It Works</h1>
            <div className='flex flex-col lg:flex-row items-center mt-5 gap-15'>
                  <div class="bg-base-100 w-96 shadow-xl outline-1 outline-(--pet-accent) rounded-2xl text-center pt-5">
                      <h2 class="text-(--pet-secondary) font-poppins font-extrabold text-5xl mb-5">Step-1</h2>
                      <p className='text-md'>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                      <div class="card-body">
                          <figure>
                              <img
                                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                  alt="Shoes" className='rounded-r-xl rounded-l-xl' />
                          </figure>
                      </div>
                  </div>
                  <div class="bg-base-100 w-96 shadow-xl outline-1 outline-(--pet-accent) rounded-2xl text-center pt-5">
                      <h2 class="text-(--pet-secondary) font-poppins font-extrabold text-5xl mb-5">Step-2</h2>
                      <p className='text-md'>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                      <div class="card-body">
                          <figure>
                              <img
                                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                  alt="Shoes" className='rounded-r-xl rounded-l-xl' />
                          </figure>
                      </div>
                  </div>
                  <div class="bg-base-100 w-96 shadow-xl outline-1 outline-(--pet-accent) rounded-2xl text-center pt-5">
                      <h2 class="text-(--pet-secondary) font-poppins font-extrabold text-5xl mb-5">Step-3</h2>
                      <p className='text-md'>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                      <div class="card-body">
                          <figure>
                              <img
                                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                  alt="Shoes" className='rounded-r-xl rounded-l-xl' />
                          </figure>
                      </div>
                  </div>
            </div>
        </div>
        <Testimonials/>
    </div>
  )
}

export default HowItWorks