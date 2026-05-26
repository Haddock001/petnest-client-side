import { Link } from 'react-router'
import SectionHeader from '../components/SectionHeader'
import Button from '../shared/Button'

const Donations = () => {
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
            const progress = Math.round((campaign.donatedAmount / campaign.maxAmount) * 100)
            return (
              <article key={campaign.id} className="rounded-[24px] bg-white p-5 shadow-xl outline outline-1 outline-(--pet-accent)/40">
                <img src={campaign.image} alt={campaign.petName} className="aspect-[4/3] w-full rounded-[18px] object-cover" />
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-poppins text-2xl font-extrabold text-(--pet-secondary)">{campaign.petName}</h3>
                    <p className="mt-1 font-poppins text-sm text-(--pet-dark)">{campaign.shortDescription}</p>
                  </div>
                  <span className="rounded-full bg-(--pet-light) px-3 py-1 text-sm font-bold text-(--pet-secondary)">{campaign.status}</span>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-(--pet-light)">
                  <div className="h-full rounded-full bg-(--pet-orange)" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-3 font-poppins text-sm font-semibold text-(--pet-dark)">
                  BDT {campaign.donatedAmount.toLocaleString()} of {campaign.maxAmount.toLocaleString()}
                </p>
                <Link to={`/donations/${campaign.id}`}>
                  <Button className="mt-5 w-full text-base">View Details</Button>
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
