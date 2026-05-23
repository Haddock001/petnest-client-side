import React from 'react'
import cat from '../assets/cat_cover.jpg'

const PetCard = () => {
  return (
      <div className="bg-base-100 w-96 shadow-xl outline-1 outline-(--pet-accent) rounded-2xl">
          <div className='flex items-center justify-center py-7'>
              <div className="hover-3d">
                  <figure className="w-60 aspect-square rounded-2xl overflow-hidden">
                      <img src={cat} className="w-full h-full object-cover" alt="Pet" />
                  </figure>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
          </div>
          <div className="card-body">
              <h2 className="text-(--pet-secondary) font-poppins font-extrabold text-2xl">Card Title</h2>
              <p className='text-md'>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          </div>
      </div>
  )
}

export default PetCard