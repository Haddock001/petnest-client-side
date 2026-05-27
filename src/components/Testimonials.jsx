import TestimonialCard from '../shared/TestimonialCard'
import SectionHeader from './SectionHeader'
import catCover from '../assets/cat_cover.jpg'
import dogCover from '../assets/dog_cover.jpg'
import petDog from '../assets/pet_dog.jpg'

const stories = [
  {
    name: 'Laura Benz',
    meta: 'Adopted Milo',
    image: catCover,
    rating: 5,
    quote: 'PetNest made the adoption process feel clear and kind. We could read the full story, contact the rescuer, and bring Milo home with confidence.',
  },
  {
    name: 'Nadia Rahman',
    meta: 'Rescue volunteer',
    image: dogCover,
    rating: 5,
    quote: 'The dashboard helps us track requests and donations without losing messages. It feels built for real rescue work, not just browsing.',
  },
  {
    name: 'Arif Hasan',
    meta: 'Campaign donor',
    image: petDog,
    rating: 5,
    quote: 'I liked seeing campaign progress and updates in one place. The experience made it easy to support urgent care before adoption.',
  },
]

const Testimonials = () => {
  return (
    <section className="bg-pet-primary px-5 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Community trust"
          title="Stories from PetNest families"
          description="Adopters, rescuers, and donors share how clearer profiles and caring workflows helped pets move toward safer homes."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <TestimonialCard key={story.name} story={story} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
