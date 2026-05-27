import { useContext } from 'react'
import { Link } from 'react-router'
import { FaEnvelope, FaFacebookF, FaGithub, FaMapMarkerAlt, FaPaw, FaPhoneAlt } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { AuthContext } from '../contexts/AuthContext'

const Footer = () => {
  const { currentUser, loading } = useContext(AuthContext)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/pets', label: 'Pet Listing' },
    { to: '/donations', label: 'Donation Campaigns' },
    ...(!loading && currentUser
      ? [{ to: '/dashboard', label: 'Dashboard' }]
      : [
          { to: '/login', label: 'Login' },
          { to: '/register', label: 'Register' },
        ]),
  ]

  return (
    <footer className="border-t border-(--pet-accent)/30 bg-(--pet-secondary) px-5 py-12 text-(--pet-primary)">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.8fr_0.9fr]">
        <section>
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logo} className="h-16 w-16 rounded-2xl bg-white p-2" alt="PetNest" />
            <div>
              <h2 className="font-ruslan text-3xl">PetNest</h2>
              <p className="font-poppins text-sm font-semibold text-(--pet-primary)/75">
                Adoption, rescue, and care campaigns.
              </p>
            </div>
          </Link>
          <p className="mt-5 max-w-md font-poppins text-sm leading-7 text-(--pet-primary)/75">
            PetNest connects adopters, rescuers, and donors through warm profiles, safer requests, and transparent donation campaigns.
          </p>
        </section>

        <section>
          <h3 className="font-poppins text-lg font-extrabold">Explore</h3>
          <nav className="mt-4 grid gap-3 font-poppins text-sm font-semibold text-(--pet-primary)/80">
            {links.map((link) => (
              <Link key={`${link.to}-${link.label}`} className="w-fit hover:text-(--pet-accent)" to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>
        </section>

        <section>
          <h3 className="font-poppins text-lg font-extrabold">Contact</h3>
          <div className="mt-4 grid gap-3 font-poppins text-sm text-(--pet-primary)/80">
            <span className="flex items-center gap-3"><FaEnvelope /> hello@petnest.local</span>
            <span className="flex items-center gap-3"><FaPhoneAlt /> +880 1700 000000</span>
            <span className="flex items-center gap-3"><FaMapMarkerAlt /> Dhaka, Bangladesh</span>
          </div>
          <div className="mt-5 flex gap-3">
            {[FaFacebookF, FaGithub, FaPaw].map((Icon, index) => (
              <span key={index} className="flex h-10 w-10 items-center justify-center rounded-full bg-(--pet-primary)/10 text-(--pet-accent)">
                <Icon />
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-(--pet-primary)/15 pt-6 font-poppins text-sm text-(--pet-primary)/70 sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 PetNest. All rights reserved.</p>
        <p>Built for kinder adoption journeys.</p>
      </div>
    </footer>
  )
}

export default Footer
