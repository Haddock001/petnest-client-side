import { useMemo, useState } from 'react'
import { FaFilter, FaSearch } from "react-icons/fa";
import PetCard from '../components/PetCard';
import SectionHeader from '../components/SectionHeader';
import { petCategories, pets } from '../data/mockData';

const Pets = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const filteredPets = useMemo(() => {
    return pets
      .filter((pet) => category === 'All' || pet.category === category)
      .filter((pet) => pet.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
  }, [category, search])

  return (
    <main className='min-h-screen bg-pet-primary px-5 pb-24 pt-36'>
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Pet listing"
          title="Find pets waiting for adoption"
          description="Search by name or filter by category. Backend infinite scrolling can plug into this same layout later with TanStack Query."
        />
        <div className='mt-10 grid gap-4 rounded-[28px] bg-white p-4 shadow-xl outline outline-1 outline-(--pet-accent)/40 lg:grid-cols-[1fr_280px]'>
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
          <label className="flex items-center gap-3 rounded-[20px] bg-(--pet-light) px-5 py-4 font-poppins text-(--pet-dark)">
            <FaFilter />
            <select
              className="w-full bg-transparent font-semibold outline-none"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>All</option>
              {petCategories.map((item) => (
                <option key={item.name}>{item.name}</option>
              ))}
            </select>
          </label>
        </div>
        <div className='mt-12 grid grid-cols-1 justify-items-center gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default Pets
