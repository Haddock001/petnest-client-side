import { useLoaderData, useNavigate, useLocation } from 'react-router'
import { useContext, useState } from 'react'

import Button from '../shared/Button'
import SectionHeader from '../components/SectionHeader'
import { AuthContext } from '../contexts/AuthContext'

const PetDetails = () => {
  const pet = useLoaderData()

  const navigate = useNavigate()
  const location = useLocation()

  const { currentUser } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)

  if (!pet) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <h2 className="font-poppins text-3xl font-bold text-red-500">
          Pet not found
        </h2>
      </main>
    )
  }

  const {
    petName,
    petImage,
    _id,
    age,
    category,
    location: petLocation,
    longDescription,
    adopted,
  } = pet

  // Handle Adopt Button
  const handleAdoptClick = () => {
    // If user is not logged in
    if (!currentUser) {
      navigate('/login', {
        state: {
          from: location.pathname,
        },
      })

      return
    }
    setIsOpen(true)
  }

  // Handle Submit
  const handleSubmitreq= ()=>{
    
  }

  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-36">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">

        {/* Pet Image */}
        <figure className="overflow-hidden rounded-[32px] bg-white p-4 shadow-xl outline outline-1 outline-(--pet-accent)/40">
          <img
            src={petImage}
            alt={petName}
            className="aspect-[4/5] w-full rounded-[24px] object-cover"
          />
        </figure>

        {/* Pet Info */}
        <div className="flex flex-col justify-center">

          <SectionHeader
            align="left"
            eyebrow={category}
            title={`${petName} is ready for a forever home`}
            description={longDescription}
          />

          {/* Details */}
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ['Age', age],
              ['Location', petLocation],
              ['Pet ID', _id],
              ['Status', adopted ? 'Adopted' : 'Available'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-[20px] bg-white p-5 shadow-md"
              >
                <dt className="font-poppins text-sm font-bold uppercase text-(--pet-orange)">
                  {label}
                </dt>

                <dd className="mt-1 font-poppins text-lg font-extrabold text-(--pet-secondary)">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Adopt Button */}
          <Button
            className="mt-8 w-fit"
            onClick={handleAdoptClick}
          >
            Adopt
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">

          <form className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl">

            <h3 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">
              Adopt {petName}
            </h3>

            <div className="mt-6 grid gap-4">

              {/* Logged In User Name */}
              <input
                className="rounded-2xl bg-(--pet-light) px-4 py-3 outline-none"
                value={currentUser?.displayName || ''}
                disabled
              />

              {/* Logged In User Email */}
              <input
                className="rounded-2xl bg-(--pet-light) px-4 py-3 outline-none"
                value={currentUser?.email || ''}
                disabled
              />

              {/* Phone */}
              <input
                className="rounded-2xl border border-(--pet-accent)/50 px-4 py-3 outline-none"
                placeholder="Phone number"
                type="tel"
              />

              {/* Address */}
              <textarea
                className="min-h-28 rounded-2xl border border-(--pet-accent)/50 px-4 py-3 outline-none"
                placeholder="Address"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                className="rounded-full px-5 py-3 font-poppins font-bold text-(--pet-dark)"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <Button
                type="submit"
                className="text-base"
              >
                Submit Request
              </Button>

            </div>
          </form>
        </div>
      )}
    </main>
  )
}

export default PetDetails