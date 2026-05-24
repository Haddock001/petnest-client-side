import { Link } from 'react-router'
import cat from '../assets/cat_cover.jpg'
import Button from '../shared/Button'

const PetCard = ({ pet, compact = false }) => {
  const petInfo = pet ?? {
    id: 'pet-101',
    name: 'Milo',
    age: '1 year',
    category: 'Cats',
    location: 'Dhanmondi, Dhaka',
    image: cat,
    shortDescription: 'Gentle, curious, and already litter trained.',
  }

  return (
    <article className="w-full max-w-sm rounded-[24px] bg-white shadow-xl outline outline-1 outline-(--pet-accent)/50 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="flex items-center justify-center px-6 pt-6">
        <figure className="aspect-square w-full overflow-hidden rounded-[22px] bg-(--pet-light)">
          <img src={petInfo.image} className="h-full w-full object-cover" alt={petInfo.name} />
        </figure>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-poppins text-2xl font-extrabold text-(--pet-secondary)">{petInfo.name}</h2>
            <p className="font-poppins text-sm font-semibold text-(--pet-orange)">{petInfo.category}</p>
          </div>
          <span className="rounded-full bg-(--pet-light) px-3 py-1 text-sm font-bold text-(--pet-secondary)">
            {petInfo.age}
          </span>
        </div>
        <p className="font-poppins text-sm leading-6 text-(--pet-dark)">{petInfo.shortDescription}</p>
        {!compact && (
          <div className="flex items-center justify-between gap-3 text-sm font-semibold text-(--pet-dark)">
            <span>{petInfo.location}</span>
          </div>
        )}
        <Link to={`/pets/${petInfo.id}`}>
          <Button className="mt-2 w-full justify-center text-base">View Details</Button>
        </Link>
      </div>
    </article>
  )
}

export default PetCard
