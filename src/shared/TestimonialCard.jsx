
const TestimonialCard = () => {
  return (
    <div className='flex justify-center items-center mt-20 flex-col lg:flex-row'>
          <div class="bg-base-100 rounded-2xl shadow-lg outline-(--pet-accent) outline-1 w-96">
              <div class="card-body">
                  <div className='flex flex-row justify-between'>
                      <div className="avatar just">
                          <div className="w-24 rounded-full">
                              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                          </div>
                      </div>
                      <div className='flex flex-col'>
                          <h1 className='font-poppins justify-start text-lg text-(--pet-dark)'>Very Good Services.</h1>
                          <p className='font-poppins justify-end'>-Laura Benz</p>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default TestimonialCard