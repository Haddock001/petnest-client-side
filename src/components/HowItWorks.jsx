import Testimonials from './Testimonials'
import SectionHeader from './SectionHeader'
import dogCover from '../assets/dog_cover.jpg'
import catCover from '../assets/cat_cover.jpg'
import petDog from '../assets/pet_dog.jpg'

const HowItWorks = () => {
  const steps = [
    {
      title: 'Find',
      text: 'Search by name, category, and location to discover pets that match your home and routine.',
      image: catCover,
    },
    {
      title: 'Connect',
      text: 'Read the full story, ask for adoption, and share your contact details with the rescuer.',
      image: dogCover,
    },
    {
      title: 'Adopt',
      text: 'Complete the review, arrange pickup, and welcome a new companion into a safer life.',
      image: 'https://images.unsplash.com/photo-1633894660288-003802421573?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]

  return (
    <div className='bg-pet-primary py-20'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-center px-5'>
            <SectionHeader
              eyebrow="Simple adoption"
              title="How It Works"
              description="PetNest keeps the journey clear, respectful, and focused on a safe match."
            />
            <div className='mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-3'>
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-[24px] bg-white p-5 text-center shadow-xl outline outline-1 outline-(--pet-accent)/50">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--pet-secondary) font-poppins text-lg font-extrabold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-5 font-poppins text-3xl font-extrabold text-(--pet-secondary)">{step.title}</h3>
                  <p className='mx-auto mt-3 max-w-xs font-poppins text-sm leading-6 text-(--pet-dark)'>{step.text}</p>
                  <figure className="mt-6 aspect-[4/3] overflow-hidden rounded-[18px]">
                    <img src={step.image} alt={step.title} className='h-full w-full object-cover' />
                  </figure>
                </article>
              ))}
            </div>
        </div>
        <Testimonials/>
    </div>
  )
}

export default HowItWorks
