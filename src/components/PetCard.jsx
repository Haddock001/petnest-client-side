import React from 'react'

const PetCard = () => {
  return (
      <div class="bg-base-100 w-96 shadow-xl outline-1 outline-(--pet-accent) rounded-2xl">
          <figure>
              <img
                  src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                  alt="Shoes" className='rounded-r-2xl rounded-l-2xl'/>
          </figure>
          <div class="card-body">
              <h2 class="text-(--pet-secondary) font-poppins font-extrabold text-2xl">Card Title</h2>
              <p className='text-md'>A card component has a figure, a body part, and inside body there are title and actions parts</p>
          </div>
      </div>
  )
}

export default PetCard