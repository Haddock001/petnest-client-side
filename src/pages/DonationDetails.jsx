import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import Button from '../shared/Button'
import SectionHeader from '../components/SectionHeader'
import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'

const DonationDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [campaign, setCampaign] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)

  const stripe = useStripe()
  const elements = useElements()

  const [amount, setAmount] = useState('')

  const handlePay = async () => {
    if (!amount || Number(amount) <= 0) {
      alert('Please enter valid amount')
      return
    }

    if (!stripe || !elements) return

    const card = elements.getElement(CardElement)
    if (!card) return

    // create payment method
    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log(error.message)
      return
    }

    // create intent
    const res = await fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        amount: Number(amount)
      })
    })

    const data = await res.json()
    const clientSecret = data.clientSecret

    // confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card }
    })

    if (result.error) {
      console.log(result.error.message)
      return
    }

    if (result.paymentIntent.status === 'succeeded') {

      await fetch('http://localhost:3000/donations-payment', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          campaignId: id,
          amount: Number(amount),
          transactionId: result.paymentIntent.id
        })
      })

      await fetch(`http://localhost:3000/donations/${id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount)
        })
      })

      setIsOpen(false)
      navigate('/dashboard')
    }
  }

  // fetch single campaign
  useEffect(() => {
    fetch(`http://localhost:3000/donations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaign(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  // recommended
  useEffect(() => {
    fetch('http://localhost:3000/donations')
      .then((res) => res.json())
      .then((data) => {
        setRecommended((data || []).filter((x) => x._id !== id).slice(0, 3))
      })
  }, [id])

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

  // FIXED NUMBERS
  const donated = Number(campaign.donatedAmount) || 0
  const max = Number(campaign.maxDonationAmount) || 1

  const progress = Math.min(
    100,
    Math.round((donated / max) * 100)
  )

  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-36">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">

          {/* FIXED IMAGE */}
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

              <p className="mt-4 font-poppins font-bold text-(--pet-secondary)">
                BDT {donated.toLocaleString()} raised of {max.toLocaleString()}
              </p>

              <p className="mt-1 font-poppins text-sm text-(--pet-dark)">
                Donation closes on {campaign.lastDate}
              </p>
            </div>

            <Button
              onClick={() => setIsOpen(true)}
              className="mt-8 rounded-full px-6 py-3 text-(--pet-dark) font-bold"
            >
              Donate Now
            </Button>

          </div>
        </div>

        {/* Recommended */}
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
                  alt={item.petName}
                  className="aspect-[4/3] rounded-[16px] object-cover"
                />

                <h3 className="mt-4 font-bold text-xl">
                  {item.petName}
                </h3>
              </Link>
            ))}

          </div>
        </section>

      </div>

      {/* Modal */}
      {/* Donation Modal */} {isOpen && (<div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-5"> <form className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl"> <h3 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)"> Donate to {campaign.petName} </h3> <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="mt-6 w-full rounded-2xl border border-(--pet-accent)/50 px-4 py-3 outline-none" placeholder="Donation amount" /> <div className="mt-4 rounded-2xl bg-(--pet-light) p-5 font-poppins text-sm font-semibold text-(--pet-dark)"> <CardElement /> </div> <div className="mt-6 flex justify-end gap-3"> <button type="button" className="rounded-full px-5 py-3 font-poppins font-bold text-(--pet-dark)" onClick={() => setIsOpen(false)} > Cancel </button> <Button type="button" onClick={handlePay} className="text-base" > Submit Donation </Button> </div> </form> </div>)}
    </main>
  )
}

export default DonationDetails