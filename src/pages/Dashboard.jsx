import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaBullhorn,
  FaCheck,
  FaDonate,
  FaHandHoldingHeart,
  FaHeart,
  FaImage,
  FaList,
  FaPaw,
  FaPause,
  FaPlus,
  FaRedo,
  FaShieldAlt,
  FaTrash,
  FaUserShield,
  FaUsers,
} from 'react-icons/fa'
import Swal from 'sweetalert2'
import { AuthContext } from '../contexts/AuthContext'
import axiosSecure from '../api/axiosSecure'
import cat from '../assets/cat_cover.jpg'

const petCategories = ['Cat', 'Dog', 'Rabbit', 'Fish', 'Bird', 'Other']

const formatCurrency = (value) => `BDT ${(Number(value) || 0).toLocaleString()}`

const Dashboard = () => {
  const { currentUser, dbUser, isAdmin, roleLoading } = useContext(AuthContext)
  const [activePanel, setActivePanel] = useState('overview')
  const [pets, setPets] = useState([])
  const [requests, setRequests] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [donators, setDonators] = useState([])
  const [myDonations, setMyDonations] = useState([])
  const [users, setUsers] = useState([])
  const [allPets, setAllPets] = useState([])
  const [allCampaigns, setAllCampaigns] = useState([])
  const [allRequests, setAllRequests] = useState([])
  const [allPayments, setAllPayments] = useState([])
  const [petImage, setPetImage] = useState('')
  const [campaignImage, setCampaignImage] = useState('')
  const [uploadingTarget, setUploadingTarget] = useState('')
  const [loading, setLoading] = useState(true)

  const petForm = useForm()
  const campaignForm = useForm()
  const encodedEmail = currentUser?.email ? encodeURIComponent(currentUser.email) : ''
  const userPhoto = currentUser?.photoURL || cat

  const stats = useMemo(() => {
    if (isAdmin) {
      return [
        { label: 'Users', value: users.length, icon: FaUserShield, color: 'text-(--pet-purple)' },
        { label: 'All pets', value: allPets.length, icon: FaShieldAlt, color: 'text-(--pet-teal)' },
        { label: 'Campaigns', value: allCampaigns.length, icon: FaDonate, color: 'text-(--pet-orange)' },
        { label: 'Requests', value: allRequests.length, icon: FaHandHoldingHeart, color: 'text-(--pet-pink)' },
        { label: 'Payments', value: allPayments.length, icon: FaHeart, color: 'text-(--pet-green)' },
      ]
    }

    return [
      { label: 'Pets added', value: pets.length, icon: FaPaw, color: 'text-(--pet-orange)' },
      { label: 'Open requests', value: requests.filter((request) => request.status === 'Pending').length, icon: FaHeart, color: 'text-(--pet-pink)' },
      { label: 'Campaigns', value: campaigns.length, icon: FaBullhorn, color: 'text-(--pet-blue)' },
      { label: 'Donators', value: donators.length, icon: FaUsers, color: 'text-(--pet-green)' },
    ]
  }, [allCampaigns.length, allPayments.length, allPets.length, allRequests.length, campaigns.length, donators.length, isAdmin, pets.length, requests, users.length])

  const navItems = useMemo(() => {
    const userItems = [
      { id: 'overview', label: 'Overview', icon: FaList },
      { id: 'add-pet', label: 'Add a pet', icon: FaPlus },
      { id: 'my-pets', label: 'My added pets', icon: FaPaw },
      { id: 'requests', label: 'Adoption requests', icon: FaHandHoldingHeart },
      { id: 'create-campaign', label: 'Create donation', icon: FaDonate },
      { id: 'campaigns', label: 'My campaigns', icon: FaBullhorn },
      { id: 'my-donations', label: 'My donations', icon: FaHeart },
    ]

    if (isAdmin) {
      return [
        { id: 'overview', label: 'Admin overview', icon: FaList },
      { id: 'users', label: 'Users', icon: FaUserShield },
      { id: 'all-pets', label: 'All pets', icon: FaShieldAlt },
      { id: 'all-donations', label: 'All donations', icon: FaDonate },
        { id: 'all-requests', label: 'All requests', icon: FaHandHoldingHeart },
        { id: 'all-payments', label: 'All payments', icon: FaHeart },
      ]
    }

    return userItems
  }, [isAdmin])

  const loadDashboardData = useCallback(async (showLoading = true) => {
    if (!encodedEmail) return

    if (showLoading) {
      setLoading(true)
    }

    try {
      if (isAdmin) {
        const [usersRes, allPetsRes, allCampaignsRes, allRequestsRes, allPaymentsRes] = await Promise.all([
          axiosSecure.get('/users'),
          axiosSecure.get('/all-pets'),
          axiosSecure.get('/all-donations'),
          axiosSecure.get('/all-adoption-requests'),
          axiosSecure.get('/all-donation-payments'),
        ])

        setUsers(usersRes.data || [])
        setAllPets(allPetsRes.data || [])
        setAllCampaigns(allCampaignsRes.data || [])
        setAllRequests(allRequestsRes.data || [])
        setAllPayments(allPaymentsRes.data || [])
        return
      }

      const [petsRes, requestsRes, campaignsRes, donatorsRes, donationsRes] = await Promise.all([
        axiosSecure.get(`/my-pets?email=${encodedEmail}`),
        axiosSecure.get(`/adoption-requests?email=${encodedEmail}`),
        axiosSecure.get(`/my-donations?email=${encodedEmail}`),
        axiosSecure.get(`/campaign-donators?email=${encodedEmail}`),
        axiosSecure.get(`/my-donation-payments?email=${encodedEmail}`).catch(() => ({ data: [] })),
      ])

      setPets(petsRes.data || [])
      setRequests(requestsRes.data || [])
      setCampaigns(campaignsRes.data || [])
      setDonators(donatorsRes.data || [])
      setMyDonations(donationsRes.data || [])
    } catch (error) {
      Swal.fire('Dashboard error', error.response?.data?.message || 'Could not load dashboard data.', 'error')
    } finally {
      setLoading(false)
    }
  }, [encodedEmail, isAdmin])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadDashboardData(false)
    }, 0)

    return () => window.clearTimeout(timer)
  }, [loadDashboardData])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActivePanel('overview')
    }, 0)

    return () => window.clearTimeout(timer)
  }, [isAdmin])

  const uploadImage = async (file, target) => {
    if (!file) return

    setUploadingTarget(target)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        { method: 'POST', body: formData }
      )
      const data = await res.json()

      if (!data.success) {
        throw new Error('Image upload failed')
      }

      if (target === 'pet') {
        setPetImage(data.data.url)
      } else {
        setCampaignImage(data.data.url)
      }
    } catch (error) {
      Swal.fire('Upload failed', error.message || 'Please try another image.', 'error')
    } finally {
      setUploadingTarget('')
    }
  }

  const handleAddPet = async (data) => {
    if (!petImage) {
      Swal.fire('Image needed', 'Please upload a pet image first.', 'warning')
      return
    }

    try {
      const petData = {
        ...data,
        image: petImage,
        adopted: false,
      }
      const res = await axiosSecure.post('/pets', petData)

      if (res.data.insertedId) {
        setPets((currentPets) => [{ ...petData, _id: res.data.insertedId }, ...currentPets])
        setPetImage('')
        petForm.reset()
        Swal.fire('Pet added', 'Your pet is now listed for adoption.', 'success')
        setActivePanel('my-pets')
      }
    } catch (error) {
      Swal.fire('Could not add pet', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleCreateCampaign = async (data) => {
    if (!campaignImage) {
      Swal.fire('Image needed', 'Please upload a campaign image first.', 'warning')
      return
    }

    try {
      const campaignData = {
        ...data,
        petImage: campaignImage,
      }
      const res = await axiosSecure.post('/donations', campaignData)

      if (res.data.insertedId) {
        setCampaigns((currentCampaigns) => [
          {
            ...campaignData,
            _id: res.data.insertedId,
            status: 'Active',
            donatedAmount: 0,
          },
          ...currentCampaigns,
        ])
        setCampaignImage('')
        campaignForm.reset()
        Swal.fire('Campaign created', 'Your donation campaign is live.', 'success')
        setActivePanel('campaigns')
      }
    } catch (error) {
      Swal.fire('Could not create campaign', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleDeletePet = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this pet?',
      text: 'This removes the pet from your listings.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await axiosSecure.delete(`/pets/${id}`)
      if (res.data.deletedCount > 0) {
        setPets((currentPets) => currentPets.filter((pet) => pet._id !== id))
        Swal.fire('Deleted', 'The pet listing was removed.', 'success')
      }
    } catch (error) {
      Swal.fire('Delete failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handlePetAdopted = async (id) => {
    try {
      const res = await axiosSecure.patch(`/pets/${id}`, { adopted: true })
      if (res.data.modifiedCount > 0) {
        setPets((currentPets) => currentPets.map((pet) => (pet._id === id ? { ...pet, adopted: true } : pet)))
      }
    } catch (error) {
      Swal.fire('Update failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleRequestStatus = async (requestId, status, petId) => {
    try {
      const res = await axiosSecure.patch(`/adoption-requests/${requestId}`, { status, petId })
      if (res.data.modifiedCount > 0) {
        setRequests((currentRequests) => currentRequests.map((request) => (
          request._id === requestId ? { ...request, status } : request
        )))
        setAllRequests((currentRequests) => currentRequests.map((request) => (
          request._id === requestId ? { ...request, status } : request
        )))

        if (status === 'Accepted') {
          setPets((currentPets) => currentPets.map((pet) => (pet._id === petId ? { ...pet, adopted: true } : pet)))
          setAllPets((currentPets) => currentPets.map((pet) => (pet._id === petId ? { ...pet, adopted: true } : pet)))
        }
      }
    } catch (error) {
      Swal.fire('Update failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleCampaignStatus = async (campaignId, status) => {
    try {
      const res = await axiosSecure.patch(`/donations/${campaignId}`, { status })
      if (res.data.modifiedCount > 0) {
        setCampaigns((currentCampaigns) => currentCampaigns.map((campaign) => (
          campaign._id === campaignId ? { ...campaign, status } : campaign
        )))
        setAllCampaigns((currentCampaigns) => currentCampaigns.map((campaign) => (
          campaign._id === campaignId ? { ...campaign, status } : campaign
        )))
      }
    } catch (error) {
      Swal.fire('Update failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleRoleUpdate = async (userId, role) => {
    try {
      const res = await axiosSecure.patch(`/users/${userId}/role`, { role })

      if (res.data.modifiedCount > 0) {
        setUsers((currentUsers) => currentUsers.map((user) => (
          user._id === userId ? { ...user, role } : user
        )))
      }
    } catch (error) {
      Swal.fire('Role update failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleUserDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: 'Delete this user record?',
      text: 'This removes the app role/profile record, not the Firebase account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await axiosSecure.delete(`/users/${userId}`)

      if (res.data.deletedCount > 0) {
        setUsers((currentUsers) => currentUsers.filter((user) => user._id !== userId))
      }
    } catch (error) {
      Swal.fire('Delete failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleAdminPetAdopted = async (id, adopted) => {
    try {
      const res = await axiosSecure.patch(`/pets/${id}`, { adopted })

      if (res.data.modifiedCount > 0) {
        setAllPets((currentPets) => currentPets.map((pet) => (pet._id === id ? { ...pet, adopted } : pet)))
        setPets((currentPets) => currentPets.map((pet) => (pet._id === id ? { ...pet, adopted } : pet)))
      }
    } catch (error) {
      Swal.fire('Pet update failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleAdminPetDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this pet?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await axiosSecure.delete(`/pets/${id}`)

      if (res.data.deletedCount > 0) {
        setAllPets((currentPets) => currentPets.filter((pet) => pet._id !== id))
        setPets((currentPets) => currentPets.filter((pet) => pet._id !== id))
      }
    } catch (error) {
      Swal.fire('Delete failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleAdminCampaignDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this campaign?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await axiosSecure.delete(`/donations/${id}`)

      if (res.data.deletedCount > 0) {
        setAllCampaigns((currentCampaigns) => currentCampaigns.filter((campaign) => campaign._id !== id))
        setCampaigns((currentCampaigns) => currentCampaigns.filter((campaign) => campaign._id !== id))
      }
    } catch (error) {
      Swal.fire('Delete failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleAdminRequestDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await axiosSecure.delete(`/adoption-requests/${id}`)

      if (res.data.deletedCount > 0) {
        setAllRequests((currentRequests) => currentRequests.filter((request) => request._id !== id))
      }
    } catch (error) {
      Swal.fire('Delete failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const handleAdminPaymentDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Delete this payment record?',
      text: 'The campaign total will be reduced by this donation amount.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
    })

    if (!confirm.isConfirmed) return

    try {
      const res = await axiosSecure.delete(`/donation-payments/${id}`)

      if (res.data.deletedCount > 0) {
        setAllPayments((currentPayments) => currentPayments.filter((payment) => payment._id !== id))
        loadDashboardData(false)
      }
    } catch (error) {
      Swal.fire('Delete failed', error.response?.data?.message || 'Please try again.', 'error')
    }
  }

  const renderEmpty = (message) => (
    <div className="rounded-[22px] border border-dashed border-(--pet-accent)/60 bg-(--pet-light)/50 p-8 text-center font-poppins font-semibold text-(--pet-dark)">
      {message}
    </div>
  )

  return (
    <main className="min-h-screen bg-pet-primary px-4 pb-16 pt-8 font-poppins text-(--pet-dark) md:px-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-[28px] bg-white p-5 shadow-xl outline outline-1 outline-(--pet-accent)/30 lg:sticky lg:top-28">
          <div className="flex items-center gap-3 border-b border-(--pet-light) pb-5">
            <img src={userPhoto} alt={currentUser?.displayName || 'Dashboard user'} className="h-14 w-14 rounded-2xl object-cover" />
            <div className="min-w-0">
              <p className="truncate text-lg font-extrabold text-(--pet-secondary)">
                {currentUser?.displayName || 'PetNest User'}
              </p>
              <p className="truncate text-xs font-semibold">{currentUser?.email}</p>
              <span className="mt-2 inline-flex rounded-full bg-(--pet-light) px-3 py-1 text-xs font-extrabold capitalize text-(--pet-secondary)">
                {roleLoading ? 'checking' : dbUser?.role || 'user'}
              </span>
            </div>
          </div>

          <nav className="mt-5 grid gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activePanel === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePanel(item.id)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                    isActive
                      ? 'bg-(--pet-secondary) text-(--pet-primary) shadow-md'
                      : 'text-(--pet-dark) hover:bg-(--pet-light) hover:text-(--pet-secondary)'
                  }`}
                >
                  <Icon /> {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <section className="space-y-6">
          <div className="rounded-[28px] bg-(--pet-secondary) p-6 text-(--pet-primary) shadow-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase text-(--pet-accent)">
                  {isAdmin ? 'Admin dashboard' : 'Dashboard'}
                </p>
                <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
                  {isAdmin ? 'Control every PetNest record' : 'Manage your PetNest activity'}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-(--pet-primary)/80">
                  {isAdmin
                    ? 'Review users, pets, adoption requests, donation campaigns, and payment records from one protected control center.'
                    : 'Review adoption requests, publish pets, and keep donation campaigns moving from one focused workspace.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => loadDashboardData()}
                className="inline-flex w-fit items-center gap-2 rounded-full bg-(--pet-accent) px-5 py-3 text-sm font-extrabold text-(--pet-secondary) shadow-md"
              >
                <FaRedo /> Refresh
              </button>
            </div>
          </div>

          {(activePanel === 'overview' || loading) && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon

                  return (
                    <article key={stat.label} className="rounded-[24px] bg-white p-5 shadow-lg outline outline-1 outline-(--pet-accent)/30">
                      <Icon className={`text-2xl ${stat.color}`} />
                      <p className="mt-4 text-sm font-bold uppercase text-(--pet-dark)">{stat.label}</p>
                      <h2 className="mt-1 text-4xl font-extrabold text-(--pet-secondary)">
                        {loading ? '...' : stat.value}
                      </h2>
                    </article>
                  )
                })}
              </div>

              <div className="grid gap-6 xl:grid-cols-2">
                <Panel title={isAdmin ? 'Recently added pets' : 'Recent pets'} actionLabel="View all" onAction={() => setActivePanel(isAdmin ? 'all-pets' : 'my-pets')}>
                  {(isAdmin ? allPets : pets).length ? (
                    <div className="space-y-3">
                      {(isAdmin ? allPets : pets).slice(0, 4).map((pet) => (
                        <CompactRow
                          key={pet._id}
                          image={pet.image}
                          title={pet.name}
                          meta={`${pet.category || 'Pet'} - ${pet.adopted ? 'Adopted' : 'Available'}`}
                        />
                      ))}
                    </div>
                  ) : renderEmpty('No pets added yet.')}
                </Panel>

                <Panel title={isAdmin ? 'Latest adoption requests' : 'Open adoption requests'} actionLabel="Review" onAction={() => setActivePanel(isAdmin ? 'all-requests' : 'requests')}>
                  {(isAdmin ? allRequests : requests).length ? (
                    <div className="space-y-3">
                      {(isAdmin ? allRequests : requests).slice(0, 4).map((request) => (
                        <CompactRow
                          key={request._id}
                          image={request.petImage}
                          title={request.petName}
                          meta={`${request.adopterName || 'Requester'} - ${request.status}`}
                        />
                      ))}
                    </div>
                  ) : renderEmpty('No adoption requests yet.')}
                </Panel>
              </div>
            </>
          )}

          {activePanel === 'add-pet' && (
            <Panel title="Add a pet">
              <form onSubmit={petForm.handleSubmit(handleAddPet)} className="grid gap-4 md:grid-cols-2">
                <ImagePicker
                  image={petImage}
                  label="Pet image"
                  uploading={uploadingTarget === 'pet'}
                  onChange={(event) => uploadImage(event.target.files[0], 'pet')}
                />
                <Field label="Pet name" error={petForm.formState.errors.name?.message}>
                  <input {...petForm.register('name', { required: 'Pet name is required' })} className="input-field" placeholder="Milo" />
                </Field>
                <Field label="Age" error={petForm.formState.errors.age?.message}>
                  <input {...petForm.register('age', { required: 'Age is required' })} className="input-field" placeholder="2 years" />
                </Field>
                <Field label="Category" error={petForm.formState.errors.category?.message}>
                  <select {...petForm.register('category', { required: 'Category is required' })} className="input-field">
                    <option value="">Choose category</option>
                    {petCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Pickup location" error={petForm.formState.errors.location?.message}>
                  <input {...petForm.register('location', { required: 'Location is required' })} className="input-field" placeholder="Dhaka" />
                </Field>
                <Field label="Short description" error={petForm.formState.errors.shortDescription?.message}>
                  <input {...petForm.register('shortDescription', { required: 'Short description is required' })} className="input-field" placeholder="Friendly and calm" />
                </Field>
                <Field label="Long description" error={petForm.formState.errors.longDescription?.message} wide>
                  <textarea {...petForm.register('longDescription', { required: 'Long description is required' })} className="input-field min-h-32" placeholder="Tell adopters about personality, care needs, and pickup details." />
                </Field>
                <button type="submit" className="md:col-span-2 inline-flex w-fit items-center gap-2 rounded-full bg-(--pet-secondary) px-6 py-3 font-extrabold text-(--pet-primary) shadow-md">
                  <FaPlus /> Add pet
                </button>
              </form>
            </Panel>
          )}

          {activePanel === 'my-pets' && (
            <Panel title="My added pets">
              {pets.length ? (
                <ResponsiveTable headers={['Pet', 'Category', 'Status', 'Actions']}>
                  {pets.map((pet) => (
                    <tr key={pet._id} className="border-t border-(--pet-light)">
                      <TablePet pet={pet} />
                      <td className="px-4 py-4">{pet.category}</td>
                      <td className="px-4 py-4">
                        <StatusBadge status={pet.adopted ? 'Adopted' : 'Available'} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <SmallAction disabled={pet.adopted} onClick={() => handlePetAdopted(pet._id)} icon={FaCheck} label="Adopted" />
                          <SmallAction tone="danger" onClick={() => handleDeletePet(pet._id)} icon={FaTrash} label="Delete" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </ResponsiveTable>
              ) : renderEmpty('No pets added yet.')}
            </Panel>
          )}

          {activePanel === 'requests' && (
            <Panel title="Adoption requests">
              {requests.length ? (
                <ResponsiveTable headers={['Pet', 'Requester', 'Contact', 'Status', 'Actions']}>
                  {requests.map((request) => (
                    <tr key={request._id} className="border-t border-(--pet-light)">
                      <TableImage title={request.petName} image={request.petImage} />
                      <td className="px-4 py-4">{request.adopterName || 'Unknown'}</td>
                      <td className="px-4 py-4">
                        <p>{request.adopterEmail}</p>
                        <p className="text-xs">{request.adopterPhone}</p>
                        <p className="text-xs">{request.adopterAddress}</p>
                      </td>
                      <td className="px-4 py-4"><StatusBadge status={request.status} /></td>
                      <td className="px-4 py-4">
                        {request.status === 'Pending' ? (
                          <div className="flex flex-wrap gap-2">
                            <SmallAction onClick={() => handleRequestStatus(request._id, 'Accepted', request.petId)} icon={FaCheck} label="Accept" />
                            <SmallAction tone="danger" onClick={() => handleRequestStatus(request._id, 'Rejected', request.petId)} icon={FaTimesIcon} label="Reject" />
                          </div>
                        ) : (
                          <span className="text-sm font-bold">Reviewed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </ResponsiveTable>
              ) : renderEmpty('No adoption requests yet.')}
            </Panel>
          )}

          {activePanel === 'create-campaign' && (
            <Panel title="Create donation campaign">
              <form onSubmit={campaignForm.handleSubmit(handleCreateCampaign)} className="grid gap-4 md:grid-cols-2">
                <ImagePicker
                  image={campaignImage}
                  label="Campaign image"
                  uploading={uploadingTarget === 'campaign'}
                  onChange={(event) => uploadImage(event.target.files[0], 'campaign')}
                />
                <Field label="Pet name" error={campaignForm.formState.errors.petName?.message}>
                  <input {...campaignForm.register('petName', { required: 'Pet name is required' })} className="input-field" placeholder="Luna" />
                </Field>
                <Field label="Maximum donation amount" error={campaignForm.formState.errors.maxDonationAmount?.message}>
                  <input type="number" {...campaignForm.register('maxDonationAmount', { required: 'Goal amount is required', min: 1 })} className="input-field" placeholder="5000" />
                </Field>
                <Field label="Last donation date" error={campaignForm.formState.errors.lastDate?.message}>
                  <input type="date" {...campaignForm.register('lastDate', { required: 'Last date is required' })} className="input-field" />
                </Field>
                <Field label="Short description" error={campaignForm.formState.errors.shortDescription?.message} wide>
                  <input {...campaignForm.register('shortDescription', { required: 'Short description is required' })} className="input-field" placeholder="Emergency treatment support" />
                </Field>
                <Field label="Long description" error={campaignForm.formState.errors.longDescription?.message} wide>
                  <textarea {...campaignForm.register('longDescription', { required: 'Long description is required' })} className="input-field min-h-32" placeholder="Explain the medical need, target amount, and timeline." />
                </Field>
                <button type="submit" className="md:col-span-2 inline-flex w-fit items-center gap-2 rounded-full bg-(--pet-secondary) px-6 py-3 font-extrabold text-(--pet-primary) shadow-md">
                  <FaDonate /> Create campaign
                </button>
              </form>
            </Panel>
          )}

          {activePanel === 'campaigns' && (
            <Panel title="My donation campaigns">
              {campaigns.length ? (
                <ResponsiveTable headers={['Campaign', 'Progress', 'Status', 'Actions']}>
                  {campaigns.map((campaign) => {
                    const donated = Number(campaign.donatedAmount) || 0
                    const max = Number(campaign.maxDonationAmount) || 1
                    const progress = Math.min(100, Math.round((donated / max) * 100))

                    return (
                      <tr key={campaign._id} className="border-t border-(--pet-light)">
                        <TableImage title={campaign.petName} image={campaign.petImage} />
                        <td className="px-4 py-4">
                          <div className="h-3 overflow-hidden rounded-full bg-(--pet-light)">
                            <div className="h-full rounded-full bg-(--pet-orange)" style={{ width: `${progress}%` }} />
                          </div>
                          <p className="mt-2 text-xs font-bold">{formatCurrency(donated)} of {formatCurrency(max)}</p>
                        </td>
                        <td className="px-4 py-4"><StatusBadge status={campaign.status || 'Active'} /></td>
                        <td className="px-4 py-4">
                          <SmallAction
                            disabled={!['Active', 'Paused'].includes(campaign.status)}
                            icon={campaign.status === 'Paused' ? FaRedo : FaPause}
                            label={['Active', 'Paused'].includes(campaign.status) ? (campaign.status === 'Paused' ? 'Resume' : 'Pause') : 'Closed'}
                            onClick={() => handleCampaignStatus(campaign._id, campaign.status === 'Paused' ? 'Active' : 'Paused')}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </ResponsiveTable>
              ) : renderEmpty('No campaigns created yet.')}
            </Panel>
          )}

          {activePanel === 'my-donations' && (
            <div className="grid gap-6 xl:grid-cols-2">
              <Panel title="My donations">
                {myDonations.length ? (
                  <div className="space-y-3">
                    {myDonations.map((donation) => (
                      <CompactRow
                        key={donation._id}
                        image={donation.campaignPetImage || cat}
                        title={donation.campaignPetName}
                        meta={`${formatCurrency(donation.amount)} - ${donation.transactionId || 'Recorded donation'}`}
                      />
                    ))}
                  </div>
                ) : renderEmpty('No donations recorded for your account yet.')}
              </Panel>

              <Panel title="Campaign donators">
                {donators.length ? (
                  <div className="space-y-3">
                    {donators.map((donation) => (
                      <div key={donation._id} className="rounded-[18px] bg-(--pet-light)/60 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-extrabold text-(--pet-secondary)">{donation.donorName || donation.donorEmail}</p>
                            <p className="text-sm">{donation.campaignPetName}</p>
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-sm font-extrabold text-(--pet-orange)">
                            {formatCurrency(donation.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : renderEmpty('No one has donated to your campaigns yet.')}
              </Panel>
            </div>
          )}

          {activePanel === 'users' && isAdmin && (
            <Panel title="Users">
              {users.length ? (
                <ResponsiveTable headers={['User', 'Email', 'Role', 'Action']}>
                  {users.map((user) => (
                    <tr key={user._id} className="border-t border-(--pet-light)">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img src={user.photoURL || cat} alt={user.name || user.email} className="h-12 w-12 rounded-2xl object-cover" />
                          <p className="font-extrabold text-(--pet-secondary)">{user.name || 'PetNest user'}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">{user.email}</td>
                      <td className="px-4 py-4"><StatusBadge status={user.role || 'user'} /></td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <SmallAction
                            icon={FaUserShield}
                            label={user.role === 'admin' ? 'Make user' : 'Make admin'}
                            onClick={() => handleRoleUpdate(user._id, user.role === 'admin' ? 'user' : 'admin')}
                          />
                          <SmallAction
                            tone="danger"
                            icon={FaTrash}
                            label="Delete"
                            onClick={() => handleUserDelete(user._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </ResponsiveTable>
              ) : renderEmpty('No users found yet.')}
            </Panel>
          )}

          {activePanel === 'all-pets' && isAdmin && (
            <Panel title="All pets">
              {allPets.length ? (
                <ResponsiveTable headers={['Pet', 'Owner', 'Status', 'Actions']}>
                  {allPets.map((pet) => (
                    <tr key={pet._id} className="border-t border-(--pet-light)">
                      <TablePet pet={pet} />
                      <td className="px-4 py-4">{pet.ownerEmail}</td>
                      <td className="px-4 py-4"><StatusBadge status={pet.adopted ? 'Adopted' : 'Available'} /></td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <SmallAction
                            icon={FaCheck}
                            label={pet.adopted ? 'Mark available' : 'Mark adopted'}
                            onClick={() => handleAdminPetAdopted(pet._id, !pet.adopted)}
                          />
                          <SmallAction tone="danger" icon={FaTrash} label="Delete" onClick={() => handleAdminPetDelete(pet._id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </ResponsiveTable>
              ) : renderEmpty('No pets found.')}
            </Panel>
          )}

          {activePanel === 'all-donations' && isAdmin && (
            <Panel title="All donations">
              {allCampaigns.length ? (
                <ResponsiveTable headers={['Campaign', 'Owner', 'Status', 'Actions']}>
                  {allCampaigns.map((campaign) => (
                    <tr key={campaign._id} className="border-t border-(--pet-light)">
                      <TableImage title={campaign.petName} image={campaign.petImage} />
                      <td className="px-4 py-4">{campaign.createdByEmail}</td>
                      <td className="px-4 py-4"><StatusBadge status={campaign.status || 'Active'} /></td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <SmallAction
                            disabled={!['Active', 'Paused'].includes(campaign.status)}
                            icon={campaign.status === 'Paused' ? FaRedo : FaPause}
                            label={['Active', 'Paused'].includes(campaign.status) ? (campaign.status === 'Paused' ? 'Resume' : 'Pause') : 'Closed'}
                            onClick={() => handleCampaignStatus(campaign._id, campaign.status === 'Paused' ? 'Active' : 'Paused')}
                          />
                          <SmallAction tone="danger" icon={FaTrash} label="Delete" onClick={() => handleAdminCampaignDelete(campaign._id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </ResponsiveTable>
              ) : renderEmpty('No campaigns found.')}
            </Panel>
          )}

          {activePanel === 'all-requests' && isAdmin && (
            <Panel title="All adoption requests">
              {allRequests.length ? (
                <ResponsiveTable headers={['Pet', 'Owner', 'Requester', 'Status', 'Actions']}>
                  {allRequests.map((request) => (
                    <tr key={request._id} className="border-t border-(--pet-light)">
                      <TableImage title={request.petName} image={request.petImage} />
                      <td className="px-4 py-4">{request.ownerEmail}</td>
                      <td className="px-4 py-4">
                        <p className="font-bold">{request.adopterName || 'Unknown'}</p>
                        <p className="text-xs">{request.adopterEmail}</p>
                        <p className="text-xs">{request.adopterPhone}</p>
                      </td>
                      <td className="px-4 py-4"><StatusBadge status={request.status} /></td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          {request.status === 'Pending' && (
                            <>
                              <SmallAction onClick={() => handleRequestStatus(request._id, 'Accepted', request.petId)} icon={FaCheck} label="Accept" />
                              <SmallAction tone="danger" onClick={() => handleRequestStatus(request._id, 'Rejected', request.petId)} icon={FaTimesIcon} label="Reject" />
                            </>
                          )}
                          <SmallAction tone="danger" icon={FaTrash} label="Delete" onClick={() => handleAdminRequestDelete(request._id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </ResponsiveTable>
              ) : renderEmpty('No adoption requests found.')}
            </Panel>
          )}

          {activePanel === 'all-payments' && isAdmin && (
            <Panel title="All donation payments">
              {allPayments.length ? (
                <ResponsiveTable headers={['Campaign', 'Donor', 'Amount', 'Transaction', 'Actions']}>
                  {allPayments.map((payment) => (
                    <tr key={payment._id} className="border-t border-(--pet-light)">
                      <TableImage title={payment.campaignPetName} image={payment.campaignPetImage} />
                      <td className="px-4 py-4">
                        <p className="font-bold">{payment.donorName || 'Unknown'}</p>
                        <p className="text-xs">{payment.donorEmail}</p>
                      </td>
                      <td className="px-4 py-4 font-extrabold text-(--pet-orange)">{formatCurrency(payment.amount)}</td>
                      <td className="px-4 py-4 text-xs">{payment.transactionId || 'Recorded payment'}</td>
                      <td className="px-4 py-4">
                        <SmallAction tone="danger" icon={FaTrash} label="Delete" onClick={() => handleAdminPaymentDelete(payment._id)} />
                      </td>
                    </tr>
                  ))}
                </ResponsiveTable>
              ) : renderEmpty('No payment records found.')}
            </Panel>
          )}
        </section>
      </div>
    </main>
  )
}

const Panel = ({ title, children, actionLabel, onAction }) => (
  <section className="rounded-[28px] bg-white p-5 shadow-xl outline outline-1 outline-(--pet-accent)/30 md:p-6">
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-2xl font-extrabold text-(--pet-secondary)">{title}</h2>
      {actionLabel && (
        <button type="button" onClick={onAction} className="w-fit rounded-full bg-(--pet-light) px-4 py-2 text-sm font-extrabold text-(--pet-secondary)">
          {actionLabel}
        </button>
      )}
    </div>
    {children}
  </section>
)

const Field = ({ label, children, error, wide = false }) => (
  <label className={`grid gap-2 ${wide ? 'md:col-span-2' : ''}`}>
    <span className="text-sm font-extrabold text-(--pet-secondary)">{label}</span>
    {children}
    {error && <span className="text-sm font-bold text-rose-600">{error}</span>}
  </label>
)

const ImagePicker = ({ image, label, uploading, onChange }) => (
  <div className="grid gap-3 md:row-span-2">
    <span className="text-sm font-extrabold text-(--pet-secondary)">{label}</span>
    <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-[24px] bg-(--pet-light)">
      {image ? (
        <img src={image} alt={label} className="h-full min-h-56 w-full object-cover" />
      ) : (
        <div className="text-center font-bold text-(--pet-dark)">
          <FaImage className="mx-auto mb-3 text-3xl text-(--pet-orange)" />
          {uploading ? 'Uploading image...' : 'Choose an image'}
        </div>
      )}
    </div>
    <input type="file" accept="image/*" onChange={onChange} className="input-field" />
  </div>
)

const ResponsiveTable = ({ headers, children }) => (
  <div className="overflow-x-auto rounded-[22px] border border-(--pet-light)">
    <table className="w-full min-w-[760px] text-left text-sm">
      <thead className="bg-(--pet-light) text-(--pet-secondary)">
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-4 font-extrabold">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  </div>
)

const TablePet = ({ pet }) => (
  <td className="px-4 py-4">
    <div className="flex items-center gap-3">
      <img src={pet.image} alt={pet.name} className="h-14 w-14 rounded-2xl object-cover" />
      <div>
        <p className="font-extrabold text-(--pet-secondary)">{pet.name}</p>
        <p className="text-xs">{pet.location}</p>
      </div>
    </div>
  </td>
)

const TableImage = ({ image, title }) => (
  <td className="px-4 py-4">
    <div className="flex items-center gap-3">
      <img src={image || cat} alt={title} className="h-14 w-14 rounded-2xl object-cover" />
      <p className="font-extrabold text-(--pet-secondary)">{title}</p>
    </div>
  </td>
)

const CompactRow = ({ image, title, meta }) => (
  <div className="flex items-center gap-3 rounded-[18px] bg-(--pet-light)/60 p-3">
    <img src={image || cat} alt={title} className="h-14 w-14 rounded-2xl object-cover" />
    <div className="min-w-0">
      <p className="truncate font-extrabold text-(--pet-secondary)">{title}</p>
      <p className="truncate text-sm">{meta}</p>
    </div>
  </div>
)

const StatusBadge = ({ status }) => {
  const normalized = status || 'Pending'
  const color = normalized === 'Active' || normalized === 'Available' || normalized === 'Accepted'
    ? 'bg-emerald-100 text-emerald-700'
    : normalized === 'Paused' || normalized === 'Rejected'
      ? 'bg-rose-100 text-rose-700'
      : 'bg-amber-100 text-amber-700'

  return <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${color}`}>{normalized}</span>
}

const SmallAction = ({ icon: Icon, label, onClick, tone = 'default', disabled = false }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-extrabold transition disabled:cursor-not-allowed disabled:opacity-50 ${
      tone === 'danger'
        ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
        : 'bg-(--pet-light) text-(--pet-secondary) hover:bg-(--pet-accent)/40'
    }`}
  >
    <Icon /> {label}
  </button>
)

const FaTimesIcon = () => <span aria-hidden="true">x</span>

export default Dashboard
