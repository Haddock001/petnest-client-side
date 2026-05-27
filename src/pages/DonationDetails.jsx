import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router'
import Swal from 'sweetalert2'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import axiosSecure from '../api/axiosSecure'

import Button from '../shared/Button'
import SectionHeader from '../components/SectionHeader'

import {
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'

const DonationDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const [campaign, setCampaign] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const [amount, setAmount] = useState('')
  const { currentUser } = useContext(AuthContext)

  // -------------------------
  // FETCH CAMPAIGN
  // -------------------------
  useEffect(() => {
    fetch(`http://localhost:3000/donations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaign(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  // -------------------------
  // RECOMMENDED CAMPAIGNS
  // -------------------------
  useEffect(() => {
    fetch('http://localhost:3000/donations')
      .then((res) => res.json())
      .then((data) => {
        setRecommended((data || [])
          .filter((x) => x._id !== id && x.status === 'Active')
          .slice(0, 3)
        )
      })
  }, [id])

  // -------------------------
  // HANDLE PAYMENT
  // -------------------------
  const handlePay = async () => {
    if (!currentUser) {
      navigate('/login', {
        state: { from: location.pathname },
      })
      return
    }

    if (campaign?.status !== 'Active') {
      Swal.fire({
        icon: 'error',
        title: campaign?.status || 'Campaign unavailable',
        text: 'You cannot donate right now.',
      })
      return
    }

    const donationAmount = Number(amount)
    const remaining = Math.max(max - donated, 0)

    if (!donationAmount || donationAmount <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid amount',
      })
      return
    }

    if (donationAmount > remaining) {
      Swal.fire({
        icon: 'warning',
        title: 'Amount exceeds campaign need',
        text: `Only BDT ${remaining.toLocaleString()} remains for this campaign.`,
      })
      return
    }

    if (!stripe || !elements) return

    const card = elements.getElement(CardElement)
    if (!card) return

    try {
      // create payment method
      const { error } = await stripe.createPaymentMethod({
        type: 'card',
        card,
      })

      if (error) {
        Swal.fire({
          icon: 'error',
          title: error.message,
        })
        return
      }

      // create payment intent
      const res = await axiosSecure.post('/create-payment-intent', {
        campaignId: id,
        amount: donationAmount,
      })

      const clientSecret = res.data.clientSecret

      // confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      })

      if (result.error) {
        Swal.fire({
          icon: 'error',
          title: result.error.message,
        })
        return
      }

      if (result.paymentIntent.status === 'succeeded') {
        // save payment
        await axiosSecure.post('/donations-payment', {
            campaignId: id,

            campaignPetName: campaign.petName,
            campaignPetImage: campaign.petImage,

            campaignOwnerEmail: campaign.createdByEmail,

            donorEmail: currentUser?.email || 'anonymous',
            donorName: currentUser?.displayName || 'unknown',

            amount: donationAmount,

            transactionId: result.paymentIntent.id,
          })

        Swal.fire({
          icon: 'success',
          title: 'Donation successful',
        })

        setIsOpen(false)
        setAmount('')

        navigate('/dashboard')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Something went wrong',
        text: error.response?.data?.message,
      })
    }
  }

  // -------------------------
  // LOADING
  // -------------------------
  if (loading) {
    return (
      <div className="pt-40 text-center text-2xl font-bold">
        Loading...
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="pt-40 text-center text-2xl font-bold">
        Campaign not found
      </div>
    )
  }

  const donated = Number(campaign.donatedAmount) || 0
  const max = Number(campaign.maxDonationAmount) || 1

  const progress = Math.min(
    100,
    Math.round((donated / max) * 100)
  )

  // -------------------------
  // UI
  // -------------------------
  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-36">
      <div className="mx-auto max-w-7xl">

        {/* TOP SECTION */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

          <img
            src={campaign.petImage}
            alt={campaign.petName}
            className="aspect-[4/5] w-full rounded-[32px] object-cover shadow-xl"
          />

          <div className="flex flex-col justify-center">

            <SectionHeader
              align="left"
              eyebrow={campaign.status}
              title={`Help ${campaign.petName}`}
              description={campaign.longDescription}
            />

            <div className="mt-8 rounded-[24px] bg-white p-6 shadow-xl">

              <div className="h-4 overflow-hidden rounded-full bg-(--pet-light)">
                <div
                  className="h-full bg-(--pet-orange)"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <p className="mt-4 font-bold text-(--pet-secondary)">
                BDT {donated.toLocaleString()} raised of{' '}
                {max.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-(--pet-dark)">
                Donation closes on {campaign.lastDate}
              </p>
              {campaign.status !== 'Active' && (
                <p className="mt-4 rounded-2xl bg-(--pet-light) px-4 py-3 text-sm font-extrabold text-(--pet-secondary)">
                  {campaign.status === 'Milestone Reached'
                    ? 'This campaign has reached its funding milestone.'
                    : campaign.status === 'Ended'
                      ? 'This campaign has ended.'
                      : 'This campaign is paused.'}
                </p>
              )}
            </div>

            <Button
              disabled={campaign.status !== 'Active'}
              onClick={() => {
                if (campaign.status !== 'Active') {
                  Swal.fire({
                    icon: 'info',
                    title: campaign.status,
                  })
                  return
                }
                if (!currentUser) {
                  navigate('/login', {
                    state: { from: location.pathname },
                  })
                  return
                }
                setIsOpen(true)
              }}
              className="mt-8 rounded-full px-6 py-3"
            >
              {campaign.status !== 'Active'
                ? campaign.status
                : 'Donate Now'}
            </Button>

          </div>
        </div>

        {/* RECOMMENDED */}
        <section className="mt-20">

          <SectionHeader
            align="left"
            title="Recommended campaigns"
            description="More active campaigns"
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {recommended.map((item) => (
              <Link
                key={item._id}
                to={`/donations/${item._id}`}
                className="rounded-[22px] bg-white p-4 shadow-lg"
              >
                <img
                  src={item.petImage}
                  className="aspect-[4/3] rounded-[16px] object-cover"
                />
                <h3 className="mt-4 text-xl font-bold">
                  {item.petName}
                </h3>
              </Link>
            ))}

          </div>
        </section>

      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">

          <form className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">

            <h3 className="text-3xl font-extrabold">
              Donate to {campaign.petName}
            </h3>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-6 w-full rounded-2xl border px-4 py-3"
              placeholder="Donation amount"
            />

            <div className="mt-4 rounded-2xl bg-(--pet-light) p-5">
              <CardElement />
            </div>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full px-5 py-3 font-bold"
              >
                Cancel
              </button>

              <Button
                type="button"
                onClick={handlePay}
              >
                Submit Donation
              </Button>

            </div>

          </form>
        </div>
      )}
    </main>
  )
}

export default DonationDetails
