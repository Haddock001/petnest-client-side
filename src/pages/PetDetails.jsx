import { useLoaderData, useNavigate, useLocation } from 'react-router'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

import Button from '../shared/Button'
import SectionHeader from '../components/SectionHeader'
import { AuthContext } from '../contexts/AuthContext'

const PetDetails = () => {

  const pet = useLoaderData()

  const navigate = useNavigate()
  const location = useLocation()

  const { currentUser } = useContext(AuthContext)

  const [isOpen, setIsOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
  } = useForm()

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
    name,
    image,
    _id,
    age,
    category,
    location: petLocation,
    longDescription,
    adopted,
    ownerEmail,
  } = pet

  // Handle Adopt Click
  const handleAdoptClick = () => {

    // prevent adopted pets
    if (adopted) {

      Swal.fire({
        icon: 'info',
        title: 'Pet already adopted',
        confirmButtonColor: '#f97316',
      })

      return
    }

    // redirect if not logged in
    if (!currentUser) {

      navigate('/login', {
        state: { from: location.pathname },
      })

      return
    }

    setIsOpen(true)
  }

  // Submit Adoption Request
  const onSubmit = async (data) => {

    try {

      const adoptionData = {
        petId: _id,
        petName: name,
        petImage: image,

        ownerEmail,

        adopterName: currentUser?.displayName,
        adopterEmail: currentUser?.email,

        adopterPhone: data.phone,
        adopterAddress: data.address,
      }

      const response = await fetch(
        'http://localhost:3000/adoption-requests',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(adoptionData),
        }
      )

      const result = await response.json()

      // handle backend errors
      if (!response.ok) {

        Swal.fire({
          icon: 'error',
          title: 'Request Failed',
          text: result.message,
          confirmButtonColor: '#ef4444',
        })

        return
      }

      // success
      if (result.insertedId) {

        Swal.fire({
          icon: 'success',
          title: 'Request Sent!',
          text: 'Adoption request submitted successfully',
          confirmButtonColor: '#f97316',
        })

        reset()

        setIsOpen(false)
      }

    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong',
        confirmButtonColor: '#ef4444',
      })
    }
  }

  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-36">

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">

        {/* IMAGE */}
        <figure className="overflow-hidden rounded-[32px] bg-white p-4 shadow-xl outline outline-1 outline-(--pet-accent)/40">

          <img
            src={image}
            alt={name}
            className="aspect-[4/5] w-full rounded-[24px] object-cover"
          />

        </figure>

        {/* DETAILS */}
        <div className="flex flex-col justify-center">

          <SectionHeader
            align="left"
            eyebrow={category}
            title={`${name} is ready for a forever home`}
            description={longDescription}
          />

          {/* INFO */}
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

          {/* ADOPT BUTTON */}
          <Button
            className={`mt-8 w-fit ${adopted
                ? 'cursor-not-allowed opacity-50'
                : ''
              }`}
            onClick={handleAdoptClick}
            disabled={adopted}
          >
            {adopted ? 'Already Adopted' : 'Adopt'}
          </Button>

        </div>
      </div>

      {/* MODAL */}
      {isOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-xl rounded-[28px] bg-white p-6 shadow-2xl"
          >

            <h3 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">
              Adopt {name}
            </h3>

            <div className="mt-6 grid gap-4">

              {/* USER NAME */}
              <input
                className="rounded-2xl bg-(--pet-light) px-4 py-3 outline-none"
                value={currentUser?.displayName || ''}
                disabled
              />

              {/* USER EMAIL */}
              <input
                className="rounded-2xl bg-(--pet-light) px-4 py-3 outline-none"
                value={currentUser?.email || ''}
                disabled
              />

              {/* PHONE */}
              <input
                {...register('phone', {
                  required: true,
                })}
                className="rounded-2xl border border-(--pet-accent)/50 px-4 py-3 outline-none"
                placeholder="Phone number"
                type="tel"
              />

              {/* ADDRESS */}
              <textarea
                {...register('address', {
                  required: true,
                })}
                className="min-h-28 rounded-2xl border border-(--pet-accent)/50 px-4 py-3 outline-none"
                placeholder="Address"
              />

            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                className="rounded-full px-5 py-3 font-poppins font-bold text-(--pet-dark)"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>

              <Button type="submit" className="text-base">
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