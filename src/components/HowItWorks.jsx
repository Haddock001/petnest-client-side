import React from 'react'

const HowItWorks = () => {
  return (
    <div>
        <div>
            <h1 className='font-poppins text-5xl font-extrabold text-center mt-25'>How It Works</h1>
            <div className='flex flex-col lg:flex-row items-center mt-10 gap-5'>
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
            </div>
        </div>
    </div>
  )
}

export default HowItWorks