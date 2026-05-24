import Button from '../shared/Button'
import cover from '../assets/cover.png'
import BrowsePets from '../components/BrowsePets'
import HowItWorks from '../components/HowItWorks'
import SectionHeader from '../components/SectionHeader'
import { petCategories } from '../data/mockData'
import dogCover from '../assets/dog_cover.jpg'
import catCover from '../assets/cat_cover.jpg'
import { Link } from 'react-router'

const Home = () => {
  return (
    <div>
      <section className="min-h-screen bg-linear-to-b from-(--pet-gradient-start) to-(--pet-gradient-end) relative overflow-hidden pt-20 lg:pt-0">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center text-center pt-12 lg:pt-20">
            <h2 className="text-(--pet-secondary) text-4xl lg:text-7xl tracking-wide font-poppins pt-10 font-bold">Because They<br /> Deserve The Best</h2>
            <p className="mt-4 text-(--pet-dark) text-base lg:text-2xl">Discover loving homes, adoption support, and donation campaigns for pets who need care now.</p>
            <Link to="/pets">
              <Button className="mt-6">Get Started</Button>
            </Link>
          </div>
        </div>

        <h1 style={{ color: 'var(--pet-accent)' }} className="absolute left-1/2 hidden -translate-x-1/2 text-[220px] leading-none font-ruslan opacity-90 z-0 select-none lg:block">PETNEST</h1>

        <div className="flex justify-center relative z-10 mt-60 lg:mt-0">
          <img src={cover} alt="" className="w-full max-w-[760px] lg:max-w-[920px]" />
        </div>
      </section>

      <section className="bg-pet-primary px-5 py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Browse by category"
            title="Every kind of companion has a place here"
            description="Filter quickly by the type of pet you are ready to welcome, then open the full listing for details."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
            {petCategories.map((category) => (
              <Link
                key={category.name}
                to={`/pets?category=${category.name}`}
                className={`rounded-[22px] p-5 text-center font-poppins shadow-lg transition hover:-translate-y-1 ${category.tone}`}
              >
                <span className="block text-3xl font-extrabold">{category.count}</span>
                <span className="mt-1 block text-lg font-bold">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-(--pet-light) px-5 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="grid grid-cols-2 gap-4">
            <img src={catCover} alt="Adoptable cat" className="aspect-[3/4] rounded-[28px] object-cover shadow-xl" />
            <img src={dogCover} alt="Adoptable dog" className="mt-12 aspect-[3/4] rounded-[28px] object-cover shadow-xl" />
          </div>
          <div>
            <SectionHeader
              align="left"
              eyebrow="Give them better"
              title="Adoption turns waiting into belonging"
              description="The platform is designed to help rescuers publish pets, receive adoption requests, and raise emergency donations while keeping the experience warm and trustworthy for visitors."
            />
            <Link to="/donations">
              <Button className="mt-8">Support a Campaign</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-pet-primary px-5 py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SectionHeader
              align="left"
              eyebrow="About PetNest"
              title="Built for safer matches"
              description="PetNest connects adopters, rescuers, and donors with clear profiles, adoption requests, and role-based dashboards."
            />
          </div>
          {['Verified pet stories', 'Adoption request flow', 'Donation campaign support'].map((item) => (
            <article key={item} className="rounded-[24px] bg-white p-8 shadow-xl outline outline-1 outline-(--pet-accent)/40">
              <h3 className="font-poppins text-2xl font-extrabold text-(--pet-secondary)">{item}</h3>
              <p className="mt-4 font-poppins leading-7 text-(--pet-dark)">
                Thoughtful UI sections make it easier to review information, take action, and build trust before a pet changes homes.
              </p>
            </article>
          ))}
        </div>
      </section>
      <BrowsePets />
      <HowItWorks />
    </div>
  )
}

export default Home
