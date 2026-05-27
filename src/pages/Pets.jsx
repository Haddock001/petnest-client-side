import { useEffect, useMemo, useState } from 'react'
import { FaFilter, FaSearch } from 'react-icons/fa'
import PetCard from '../components/PetCard'
import SectionHeader from '../components/SectionHeader'

const Pets = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetch('http://localhost:3000/pets')
      .then((res) => res.json())
      .then((data) => {
        setPets(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  // create categories dynamically from API data
  const petCategories = useMemo(() => {
    const categories = pets.map((pet) => pet.category)
    return ['All', ...new Set(categories)]
  }, [pets])

  const filteredPets = useMemo(() => {
    return pets
      .filter((pet) => !pet.adopted)
      .filter(
        (pet) => category === 'All' || pet.category === category
      )
      .filter((pet) =>
        (pet.name || '')
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  }, [pets, category, search])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl font-bold">Loading pets...</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Pet listing"
          title="Find pets waiting for adoption"
          description="Search by name or filter by category."
        />

        {/* Search + Filter */}
        <div className="mt-10 grid gap-4 rounded-[28px] bg-white p-4 shadow-xl outline outline-1 outline-(--pet-accent)/40 lg:grid-cols-[1fr_280px]">
          {/* Search */}
          <label className="flex items-center gap-3 rounded-[20px] bg-(--pet-light) px-5 py-4 font-poppins text-(--pet-dark)">
            <FaSearch />

            <input
              type="search"
              className="w-full bg-transparent outline-none"
              placeholder="Search by name"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>

          {/* Filter */}
          <label className="flex items-center gap-3 rounded-[20px] bg-(--pet-light) px-5 py-4 font-poppins text-(--pet-dark)">
            <FaFilter />

            <select
              className="w-full bg-transparent font-semibold outline-none"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {petCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Pets Grid */}
        <div className="mt-12 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPets.length > 0 ? (
            filteredPets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))
          ) : (
            <p className="col-span-full text-center text-xl font-semibold">
              No pets found.
            </p>
          )}
        </div>
      </div>
    </main>
  )
}

export default Pets