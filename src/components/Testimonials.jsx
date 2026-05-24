import TestimonialCard from '../shared/TestimonialCard'

const Testimonials = () => {
  return (
    <section className='flex flex-col bg-pet-primary justify-center px-4 py-24'>
        <div>
              <h1 className='text-poppins text-center mb-10 text-5xl font-extrabold text-(--pet-secondary)'>Testimonials: From Happy Pet Owners</h1>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 justify-center lg:px-35'>
        <TestimonialCard />
        <TestimonialCard />
        <TestimonialCard />
        </div>
    </section>
  )
}

export default Testimonials
