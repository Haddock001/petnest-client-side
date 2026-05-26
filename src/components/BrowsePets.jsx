import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import PetCard from './PetCard'
import Button from '../shared/Button'
import SectionHeader from './SectionHeader'

const BrowsePets = () => {

  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetch('http://localhost:3000/pets')
      .then(res => res.json())
      .then(data => {
        setPets(data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })

  }, [])

  if (loading) {
    return (
      <section className='bg-pet-primary px-5 py-24'>
        <h2 className='text-center text-2xl font-bold'>
          Loading pets...
        </h2>
      </section>
    )
  }

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
            <PetCard
              key={pet._id}
              pet={pet}
            />
          ))}

        </div>

        <Link to="/pets">
          <Button className='mt-12'>
            Browse More
          </Button>
        </Link>

      </div>
    </section>
  )
}

export default BrowsePets