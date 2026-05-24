import Petcard from '../components/PetCard'
import { pets } from '../data/mockData'

const InfiniteBrowse = () => {
  return (
    <div className='mx-auto grid max-w-7xl grid-cols-1 justify-items-center gap-8 px-5 pt-14 md:grid-cols-2 lg:grid-cols-3'>
        {pets.map((pet) => (
          <Petcard key={pet.id} pet={pet} />
        ))}
    </div>
  )
}

export default InfiniteBrowse
