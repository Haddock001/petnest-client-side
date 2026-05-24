import PetCard from './PetCard'
import Button from '../shared/Button'
import SectionHeader from './SectionHeader'
import { pets } from '../data/mockData'
import { Link } from 'react-router'

const BrowsePets = () => {
  return (
    <section className='bg-pet-primary px-5 py-24'>
      <div className='mx-auto flex max-w-7xl flex-col items-center'>
          <SectionHeader
            eyebrow="Ready for home"
            title="Featured Pets"
            description="A few gentle faces waiting for someone kind to start the next chapter with them."
          />
          <div className='mt-12 grid w-full grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
              {pets.slice(0, 3).map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
          </div>
          <Link to="/pets">
            <Button className='mt-12'>Browse More</Button>
          </Link>
      </div>
    </section>
  )
}

export default BrowsePets
