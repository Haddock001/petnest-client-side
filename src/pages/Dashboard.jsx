import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaHeart,
  FaPaw,
  FaPlus,
  FaTable,
  FaUsers,
} from 'react-icons/fa'
import Swal from 'sweetalert2'

import Button from '../shared/Button'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

const Dashboard = () => {
  const { currentUser, loading } = useContext(AuthContext)
  const [pets, setPets] = useState([])
  const [requests, setRequests] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [donators, setDonators] = useState([])
  const petForm = useForm()
  const campaignForm = useForm()
  const [uploadedImage, setUploadedImage] = useState('')
  const [uploading, setUploading] = useState(false)

  const { register: register2, handleSubmit: handleSubmit2 } = campaignForm
  

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
  } = petForm

  const {
    register: registerCampaign,
    handleSubmit: handleSubmitCampaign,
  } = campaignForm

  // fetch pets
  useEffect(() => {
    if (!currentUser?.email) return

    fetch(`http://localhost:3000/pets?email=${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => setPets(data))
  }, [currentUser])

  // fetch requests
  useEffect(() => {

    if (!currentUser?.email) return

    fetch(
      `http://localhost:3000/adoption-requests?email=${currentUser.email}`
    )
      .then(res => res.json())
      .then(data => setRequests(data))

  }, [currentUser])

  // submit pet
  const onSubmit = async (data) => {

    if (!currentUser?.email) {
      alert("User not found")
      return
    }

    const petData = {
      ...data,
      image: uploadedImage,
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

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This pet will be deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    })

    if (!result.isConfirmed) return

    try {

      const response = await fetch(
        `http://localhost:3000/pets/${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await response.json()

      if (data.deletedCount > 0) {

        setPets(prev =>
          prev.filter(pet => pet._id !== id)
        )

        Swal.fire({
          icon: 'success',
          title: 'Pet deleted successfully',
          confirmButtonColor: '#f97316',
        })
      }

    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Delete failed',
      })
    }
  }

  // Accept Requests
  const handleStatusUpdate = async (
    requestId,
    status,
    petId
  ) => {

    try {

      const response = await fetch(
        `http://localhost:3000/adoption-requests/${requestId}`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            status,
            petId,
          }),
        }
      )

      const result = await response.json()

      if (result.modifiedCount > 0) {

        Swal.fire({
          icon: 'success',
          title: `Request ${status}`,
          confirmButtonColor: '#f97316',
        })

        // Update request state
        setRequests(prev =>
          prev.map(req =>
            req._id === requestId
              ? { ...req, status }
              : req
          )
        )

        // Update pet state
        if (status === 'Accepted') {

          setPets(prev =>
            prev.map(pet =>
              pet._id === petId
                ? { ...pet, adopted: true }
                : pet
            )
          )
        }
      }

    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Failed',
        text: 'Something went wrong',
      })
    }
  }

  // handle image upload

  const handleImageUpload = async (e) => {
    const image = e.target.files[0]

    if (!image) return

    setUploading(true)

    const formData = new FormData()
    formData.append('image', image)

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await res.json()

      if (data.success) {
        setUploadedImage(data.data.url)

        Swal.fire({
          icon: 'success',
          title: 'Image uploaded successfully',
        })
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Image upload failed',
      })
    } finally {
      setUploading(false)
    }
  }

  // Fetch donators
  useEffect(() => {
    if (!currentUser?.email) return

    fetch(`http://localhost:3000/campaign-donators?email=${currentUser.email}`)
      .then(res => res.json())
      .then(data => setDonators(data))
  }, [currentUser])

  useEffect(() => {
    if (!currentUser?.email) return

    fetch(`http://localhost:3000/donations?email=${currentUser.email}`)
      .then(res => res.json())
      .then(data => setCampaigns(data))
  }, [currentUser])

  // Donation campaign submit function
  const handleCreateCampaign = async (data) => {

    try {

      const campaignData = {
        ...data,

        donatedAmount: 0,

        status: 'Active',

        createdByEmail: currentUser.email,

        createdAt: new Date(),
      }

      const response = await fetch(
        'http://localhost:3000/donations',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(campaignData),
        }
      )

      const result = await response.json()

      if (result.insertedId) {

        setCampaigns(prev => [
          ...prev,
          {
            ...campaignData,
            _id: result.insertedId,
          },
        ])

        Swal.fire({
          icon: 'success',
          title: 'Campaign Created',
        })
      }

    } catch (error) {

      Swal.fire({
        icon: 'error',
        title: 'Failed to create campaign',
      })
    }
  }

  // stop donation
  const handlePauseCampaign = async (id) => {

    const response = await fetch(
      `http://localhost:3000/donations/pause/${id}`,
      {
        method: 'PATCH',
      }
    )

    const result = await response.json()

    if (result.modifiedCount > 0) {

      setCampaigns(prev =>
        prev.map(campaign =>
          campaign._id === id
            ? { ...campaign, status: 'Paused' }
            : campaign
        )
      )

      Swal.fire({
        icon: 'success',
        title: 'Campaign Paused',
      })
    }
  }

  // resume donation function
  const handleResumeCampaign = async (id) => {

    const response = await fetch(
      `http://localhost:3000/donations/resume/${id}`,
      {
        method: 'PATCH',
      }
    )

    const result = await response.json()

    if (result.modifiedCount > 0) {

      setCampaigns(prev =>
        prev.map(campaign =>
          campaign._id === id
            ? { ...campaign, status: 'Active' }
            : campaign
        )
      )

      Swal.fire({
        icon: 'success',
        title: 'Campaign Resumed',
      })
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
              [
                'Open requests',
                requests.filter(req => req.status === 'Pending').length,
                FaHeart,
              ],
              ['Campaigns', campaigns.length, FaTable],
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
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full rounded-2xl border border-(--pet-accent)/40 px-4 py-3 outline-none"
                />

                {errors.image && (
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

                {errors.name && (
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
          {/* CREATE DONATION CAMPAIGN */}
          <form
            onSubmit={handleSubmitCampaign(handleCreateCampaign)}
            id="create-donation"
            className="rounded-[28px] bg-white p-6 shadow-xl"
          >
            <h2 className="text-3xl font-bold">Create Donation Campaign</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">

              <input
                {...registerCampaign('petName', { required: true })}
                placeholder="Pet Name"
                className="input"
              />

              <input
                {...registerCampaign('petImage', { required: true })}
                placeholder="Pet Image URL"
                className="input"
              />

              <input
                {...registerCampaign('maxDonationAmount', { required: true })}
                type="number"
                placeholder="Goal Amount"
                className="input"
              />

              <input
                {...registerCampaign('lastDate', { required: true })}
                type="date"
                className="input"
              />

              <textarea
                {...registerCampaign('shortDescription')}
                placeholder="Short description"
                className="input md:col-span-2"
              />

              <textarea
                {...registerCampaign('longDescription')}
                placeholder="Long description"
                className="input md:col-span-2"
              />
            </div>

            <Button type="submit" className="mt-5">
              Create Campaign
            </Button>
          </form>
          {/* ADOPTION REQUESTS TABLE */}

          <section
            id="adoption-requests"
            className="overflow-hidden rounded-[28px] bg-white shadow-xl"
          >
            <div className="flex items-center justify-between p-6">

              <h2 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">
                Adoption Requests
              </h2>

              <FaHeart className="text-(--pet-orange)" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left font-poppins">

                <thead className="bg-(--pet-light) text-(--pet-secondary)">
                  <tr>
                    {[
                      '#',
                      'Pet',
                      'Adopter',
                      'Email',
                      'Phone',
                      'Address',
                      'Status',
                      'Actions',
                    ].map((head) => (
                      <th key={head} className="px-6 py-4">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>

                  {requests.map((request, index) => (

                    <tr
                      key={request._id}
                      className="border-t border-(--pet-light)"
                    >

                      <td className="px-6 py-4">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 font-bold">
                        {request.petName}
                      </td>

                      <td className="px-6 py-4">
                        {request.adopterName}
                      </td>

                      <td className="px-6 py-4">
                        {request.adopterEmail}
                      </td>

                      <td className="px-6 py-4">
                        {request.adopterPhone}
                      </td>

                      <td className="px-6 py-4">
                        {request.adopterAddress}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-4 py-2 text-sm font-bold text-white
                  
                  ${request.status === 'Pending'
                              ? 'bg-yellow-500'
                              : request.status === 'Accepted'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }
                `}
                        >
                          {request.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        {request.status === 'Pending' && (

                          <div className="flex gap-2">

                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  request._id,
                                  'Accepted',
                                  request.petId
                                )
                              }
                              className="rounded-lg bg-green-500 px-4 py-2 text-white"
                            >
                              Accept
                            </button>

                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  request._id,
                                  'Rejected',
                                  request.petId
                                )
                              }
                              className="rounded-lg bg-red-500 px-4 py-2 text-white"
                            >
                              Reject
                            </button>

                          </div>
                        )}

                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </section>
          <section className="overflow-hidden rounded-[28px] bg-white shadow-xl">

            <div className="p-6">

              <h2 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">
                My Campaigns
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px] text-left font-poppins">

                <thead className="bg-(--pet-light)">

                  <tr>
                    <th className="px-6 py-4">Pet</th>
                    <th className="px-6 py-4">Raised</th>
                    <th className="px-6 py-4">Goal</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>

                </thead>

                <tbody>

                  {campaigns.map(campaign => (

                    <tr key={campaign._id}>

                      <td className="px-6 py-4">
                        {campaign.petName}
                      </td>

                      <td className="px-6 py-4">
                        ৳ {campaign.donatedAmount}
                      </td>

                      <td className="px-6 py-4">
                        ৳ {campaign.maxDonationAmount}
                      </td>

                      <td className="px-6 py-4">
                        {campaign.status}
                      </td>

                      <td className="px-6 py-4">

                        {campaign.status === 'Active' ? (

                          <button
                            onClick={() =>
                              handlePauseCampaign(campaign._id)
                            }
                            className="rounded-lg bg-red-500 px-4 py-2 text-white"
                          >
                            Pause
                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              handleResumeCampaign(campaign._id)
                            }
                            className="rounded-lg bg-green-500 px-4 py-2 text-white"
                          >
                            Resume
                          </button>

                        )}

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </section>
          <section className="overflow-hidden rounded-[28px] bg-white shadow-xl">

            <div className="p-6">

              <h2 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">
                Campaign Donators
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px] text-left font-poppins">

                <thead className="bg-(--pet-light)">

                  <tr>
                    <th className="px-6 py-4">Donor</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Campaign</th>
                    <th className="px-6 py-4">Amount</th>
                  </tr>

                </thead>

                <tbody>

                  {donators.map(donation => (

                    <tr key={donation._id}>

                      <td className="px-6 py-4">
                        {donation.donorName}
                      </td>

                      <td className="px-6 py-4">
                        {donation.donorEmail}
                      </td>

                      <td className="px-6 py-4">
                        {donation.campaignPetName}
                      </td>

                      <td className="px-6 py-4">
                        ৳ {donation.amount}
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