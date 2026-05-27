import { Link } from 'react-router'
import SectionHeader from '../components/SectionHeader'
import Button from '../shared/Button'
import { useEffect, useState } from 'react'

const Donations = () => {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/donations')
      .then((res) => res.json())
      .then((data) => {
        setDonations(data || [])
        setLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load donations:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading campaigns...
      </div>
    )
  }

  if (!donations.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        No donation campaigns found
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-pet-primary px-5 pb-24 pt-36">
      <div className="mx-auto max-w-7xl">

        <SectionHeader
          eyebrow="Donation campaigns"
          title="Support urgent care before adoption"
          description="Campaign cards show target amount, current progress, and campaign status."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

          {donations.map((campaign) => {

            const donated = Number(campaign.donatedAmount) || 0
            const max = Number(campaign.maxDonationAmount) || 1

            const progress = Math.min(
              100,
              Math.round((donated / max) * 100)
            )
            const isActive = (campaign.status || 'Active') === 'Active'

            return (
              <article
                key={campaign._id}
                className="rounded-[24px] bg-white p-5 shadow-xl outline outline-1 outline-(--pet-accent)/40"
              >

                {/* FIXED IMAGE FIELD */}
                <img
                  src={campaign.petImage}
                  alt={campaign.petName}
                  className="aspect-[4/3] w-full rounded-[18px] object-cover"
                />

                <div className="mt-5 flex items-start justify-between gap-3">

                  <div>
                    <h3 className="font-poppins text-2xl font-extrabold text-(--pet-secondary)">
                      {campaign.petName}
                    </h3>

                    <p className="mt-1 font-poppins text-sm text-(--pet-dark)">
                      {campaign.shortDescription}
                    </p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-sm font-bold ${
                    isActive
                      ? 'bg-(--pet-light) text-(--pet-secondary)'
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {campaign.status || 'Active'}
                  </span>

                </div>

                {/* Progress bar */}
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-(--pet-light)">
                  <div
                    className="h-full rounded-full bg-(--pet-orange)"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-3 font-poppins text-sm font-semibold text-(--pet-dark)">
                  BDT {donated.toLocaleString()} of {max.toLocaleString()}
                </p>

                {!isActive && (
                  <p className="mt-3 rounded-2xl bg-(--pet-light) px-4 py-3 font-poppins text-sm font-bold text-(--pet-secondary)">
                    {campaign.status === 'Milestone Reached'
                      ? 'Milestone reached'
                      : campaign.status === 'Ended'
                        ? 'Campaign ended'
                        : 'Campaign paused'}
                  </p>
                )}

                <Link to={`/donations/${campaign._id}`}>
                  <Button className="mt-5 w-full text-base">
                    View Details
                  </Button>
                </Link>

              </article>
            )
          })}

        </div>
      </div>
    </main>
  )
}

export default Donations
