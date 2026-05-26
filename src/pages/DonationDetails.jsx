import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import Button from '../shared/Button'
import SectionHeader from '../components/SectionHeader'

const DonationDetails = () => {
  const { donationId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const campaign = useMemo(() => donations.find((item) => item.id === donationId) ?? donations[0], [donationId])
  const recommended = donations.filter((item) => item.id !== campaign.id).slice(0, 3)
  const progress = Math.round((campaign.donatedAmount / campaign.maxAmount) * 100)

  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <img src={campaign.image} alt={campaign.petName} className="aspect-[4/5] w-full rounded-[32px] object-cover shadow-xl" />
          <div className="flex flex-col justify-center">
            <SectionHeader align="left" eyebrow={campaign.status} title={`Help ${campaign.petName}`} description={campaign.longDescription} />
            <div className="mt-8 rounded-[24px] bg-white p-6 shadow-xl">
              <div className="h-4 overflow-hidden rounded-full bg-(--pet-light)">
                <div className="h-full bg-(--pet-orange)" style={{ width: `${progress}%` }} />
              </div>
              <p className="mt-4 font-poppins font-bold text-(--pet-secondary)">
                BDT {campaign.donatedAmount.toLocaleString()} raised of {campaign.maxAmount.toLocaleString()}
              </p>
              <p className="mt-1 font-poppins text-sm text-(--pet-dark)">Donation closes on {campaign.deadline}</p>
            </div>
            <Button className="mt-8 w-fit" onClick={() => setIsOpen(true)}>Donate Now</Button>
          </div>
        </div>

        <section className="mt-20">
          <SectionHeader align="left" title="Recommended campaigns" description="Three more active campaigns can appear here from the database." />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recommended.map((item) => (
              <Link key={item.id} to={`/donations/${item.id}`} className="rounded-[22px] bg-white p-4 shadow-lg">
                <img src={item.image} alt={item.petName} className="aspect-[4/3] rounded-[16px] object-cover" />
                <h3 className="mt-4 font-poppins text-xl font-extrabold text-(--pet-secondary)">{item.petName}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 px-5">
          <form className="w-full max-w-lg rounded-[28px] bg-white p-6 shadow-2xl">
            <h3 className="font-poppins text-3xl font-extrabold text-(--pet-secondary)">Donate to {campaign.petName}</h3>
            <input className="mt-6 w-full rounded-2xl border border-(--pet-accent)/50 px-4 py-3 outline-none" placeholder="Donation amount" />
            <div className="mt-4 rounded-2xl bg-(--pet-light) p-5 font-poppins text-sm font-semibold text-(--pet-dark)">
              Stripe card element placeholder
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className="rounded-full px-5 py-3 font-poppins font-bold text-(--pet-dark)" onClick={() => setIsOpen(false)}>Cancel</button>
              <Button type="button" className="text-base">Submit Donation</Button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}

export default DonationDetails
