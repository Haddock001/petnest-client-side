import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaHeart,
  FaPaw,
  FaPlus,
  FaTable,
  FaUsers,
} from 'react-icons/fa'

import Button from '../shared/Button'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Dashboard = () => {
  const { currentUser, loading } = useContext(AuthContext)
  const [pets, setPets] = useState([])

  const navItems = [
    'Add a pet',
    'My added pets',
    'Adoption requests',
    'Create donation',
    'My campaigns',
    'My donations',
    'Users',
    'All pets',
    'All donations',
  ]

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // fetch pets
  useEffect(() => {
    if (!currentUser?.email) return

    fetch(`http://localhost:3000/pets?email=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => setPets(data))
  }, [currentUser])

  // submit pet
  const onSubmit = async (data) => {

    if (!currentUser?.email) {
      alert("User not found")
      return
    }

    const petData = {
      ...data,
      adopted: false,
      createdAt: new Date(),
      ownerEmail: currentUser.email,
    }

    const response = await fetch('http://localhost:3000/pets', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(petData),
    })

    const result = await response.json()

    if (result.insertedId) {
      setPets((prev) => [
        ...prev,
        { ...petData, _id: result.insertedId },
      ])

      reset()
      alert("Pet added successfully")
    }
  }

  // Delete pet
  const handleDelete = async (id) => {

    const confirmDelete = confirm('Are you sure?');

    if (!confirmDelete) return;

    try {

      const response = await fetch(`http://localhost:3000/pets/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (result.deletedCount > 0) {

        setPets(prev => prev.filter(pet => pet._id !== id));

        alert('Pet deleted successfully');
      }

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-28">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">

        {/* SIDEBAR */}
        <aside className="rounded-[28px] bg-white p-5 shadow-xl outline outline-1 outline-(--pet-accent)/40">
          <h1 className="font-poppins text-2xl font-extrabold text-(--pet-secondary)">
            Dashboard
          </h1>

          <nav className="mt-6 grid gap-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                className="rounded-2xl px-4 py-3 font-poppins text-sm font-bold text-(--pet-dark) hover:bg-(--pet-light)"
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* CONTENT */}
        <section className="space-y-6">

          {/* STATS */}
          <div className="grid gap-4 md:grid-cols-3">

            {[
              ['Pets added', pets.length, FaPaw],
              ['Open requests', 0, FaHeart],
              ['Campaigns', 0, FaTable],
            ].map(([label, value, Icon]) => (
              <article
                key={label}
                className="rounded-[24px] bg-white p-6 shadow-xl"
              >
                <Icon className="text-2xl text-(--pet-orange)" />

                <p className="mt-4 font-poppins text-sm font-bold uppercase text-(--pet-dark)">
                  {label}
                </p>

                <h2 className="font-poppins text-4xl font-extrabold text-(--pet-secondary)">
                  {value}
                </h2>
              </article>
            ))}
          </div>

          {/* ADD PET FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            id="add-a-pet"
            className="rounded-[28px] bg-white p-6 shadow-xl"
          >
            <h2 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">
              Add a pet
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              {/* IMAGE */}
              <div>
                <input
                  {...register('image', { required: true })}
                  className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none"
                  placeholder="Pet image URL"
                />

                {errors.petImage && (
                  <p className="mt-1 text-sm text-red-500">
                    Pet image is required
                  </p>
                )}
              </div>

              {/* NAME */}
              <div>
                <input
                  {...register('name', { required: true })}
                  className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none"
                  placeholder="Pet name"
                />

                {errors.petName && (
                  <p className="mt-1 text-sm text-red-500">
                    Pet name is required
                  </p>
                )}
              </div>

              {/* AGE */}
              <div>
                <input
                  {...register('age', { required: true })}
                  className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none"
                  placeholder="Pet age"
                />

                {errors.age && (
                  <p className="mt-1 text-sm text-red-500">
                    Age is required
                  </p>
                )}
              </div>

              {/* CATEGORY */}
              <div>
                <select
                  {...register('category', { required: true })}
                  className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select pet category
                  </option>

                  <option value="Cats">Cats</option>
                  <option value="Dogs">Dogs</option>
                  <option value="Fishes">Fishes</option>
                  <option value="Rabbits">Rabbits</option>
                  <option value="Birds">Birds</option>
                </select>

                {errors.category && (
                  <p className="mt-1 text-sm text-red-500">
                    Category is required
                  </p>
                )}
              </div>

              {/* LOCATION */}
              <div>
                <input
                  {...register('location', { required: true })}
                  className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none"
                  placeholder="Pickup location"
                />

                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">
                    Location is required
                  </p>
                )}
              </div>

              {/* SHORT DESCRIPTION */}
              <div>
                <input
                  {...register('shortDescription', { required: true })}
                  className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none"
                  placeholder="Short description"
                />

                {errors.shortDescription && (
                  <p className="mt-1 text-sm text-red-500">
                    Short description is required
                  </p>
                )}
              </div>

              {/* LONG DESCRIPTION */}
              <div className="md:col-span-2">
                <textarea
                  {...register('longDescription', { required: true })}
                  className="min-h-32 w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none"
                  placeholder="Long description"
                />

                {errors.longDescription && (
                  <p className="mt-1 text-sm text-red-500">
                    Long description is required
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="mt-6 text-base">
              <FaPlus />
              Submit Pet
            </Button>
          </form>

          {/* PET TABLE */}
          <section
            id="my-added-pets"
            className="overflow-hidden rounded-[28px] bg-white shadow-xl"
          >
            <div className="flex items-center justify-between p-6">
              <h2 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">
                My added pets
              </h2>

              <FaUsers className="text-(--pet-orange)" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left font-poppins">

                <thead className="bg-(--pet-light) text-(--pet-secondary)">
                  <tr>
                    {['#', 'Pet Name', 'Category', 'Status', 'Action'].map((head) => (
                      <th key={head} className="px-6 py-4">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {pets.map((pet, index) => (
                    <tr
                      key={pet._id}
                      className="border-t border-(--pet-light)"
                    >
                      <td className="px-6 py-4">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 font-bold text-(--pet-secondary)">
                        {pet.name}
                      </td>

                      <td className="px-6 py-4">
                        {pet.category}
                      </td>

                      <td className="px-6 py-4">
                        {pet.adopted ? 'Adopted' : 'Available'}
                      </td>

                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(pet._id)}
                          className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </section>
        </section>
      </div>
    </main>
  )
}

export default Dashboard