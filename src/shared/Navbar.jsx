import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { FaBars, FaChevronDown, FaMoon, FaSignOutAlt, FaSun, FaTimes, FaUserCircle } from 'react-icons/fa'
import logo from '../assets/logo.png'
import { useNavbarVisibility } from '../hooks/useNavbarVisibility'
import cat from '../assets/cat_cover.jpg'

const Navbar = () => {
  const isVisible = useNavbarVisibility()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [theme, setTheme] = useState('light')
  const profileRef = useRef(null)

  const links = [
    { to: '/', label: 'Home' },
    { to: '/pets', label: 'Pet Listing' },
    { to: '/donations', label: 'Donation Campaigns' },
  ]

  const currentUser = {
    name: 'PetNest User',
    email: 'user@petnest.com',
    photoURL: cat,
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 transition ${
      isActive
        ? 'bg-(--pet-secondary) text-white shadow-md'
        : 'text-(--pet-secondary) hover:bg-(--pet-light) hover:text-(--pet-orange)'
    }`

  const closeMobileMenu = () => setIsMenuOpen(false)

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-3 pt-3 transition-transform duration-300 ease-in-out lg:px-0 lg:pt-0 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-7xl rounded-[28px] bg-pet-primary px-4 shadow-xl lg:rounded-none lg:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <img src={logo} className="w-16" alt="PetNest" />
            <span className="hidden font-ruslan text-3xl text-(--pet-secondary) sm:block">PetNest</span>
          </Link>

          <nav className="hidden items-center gap-2 font-poppins text-sm font-bold md:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle theme"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-(--pet-light) text-(--pet-secondary) transition hover:scale-105"
              onClick={() => setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))}
            >
              {theme === 'light' ? <FaMoon /> : <FaSun />}
            </button>

            {!currentUser ? (
              <div className="hidden items-center gap-2 md:flex">
                <Link to="/login" className="rounded-full px-4 py-2 font-poppins text-sm font-bold text-(--pet-secondary) hover:bg-(--pet-light)">
                  Login
                </Link>
                <Link to="/register" className="rounded-full bg-(--pet-secondary) px-5 py-2 font-poppins text-sm font-bold text-white shadow-md hover:bg-(--pet-orange)">
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative hidden md:block" ref={profileRef}>
                <button
                  type="button"
                  aria-label="User profile"
                  className="flex items-center gap-2 rounded-full bg-white px-2 py-2 font-poppins text-sm font-bold text-(--pet-secondary) shadow-md outline-1 outline-(--pet-accent)/40"
                  onClick={() => setIsProfileOpen((isOpen) => !isOpen)}
                  aria-expanded={isProfileOpen}
                >
                  <img src={currentUser.photoURL} alt={currentUser.name} className="h-9 w-9 rounded-full object-cover" />
                  <FaChevronDown className={`text-xs transition ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 top-14 w-64 rounded-[22px] bg-white p-4 font-poppins text-sm text-(--pet-dark) shadow-2xl outline outline-1 outline-(--pet-accent)/30">
                    <div className="flex items-center gap-3 border-b border-(--pet-light) pb-4">
                      <img src={currentUser.photoURL} alt={currentUser.name} className="h-12 w-12 rounded-full object-cover" />
                      <div>
                        <p className="font-extrabold text-(--pet-secondary)">{currentUser.name}</p>
                        <p className="text-xs">{currentUser.email}</p>
                      </div>
                    </div>
                    <Link className="mt-3 flex items-center gap-3 rounded-2xl px-3 py-3 font-bold hover:bg-(--pet-light)" to="/dashboard" onClick={() => setIsProfileOpen(false)}>
                      <FaUserCircle /> Dashboard
                    </Link>
                    <button type="button" className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left font-bold hover:bg-(--pet-light)">
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-(--pet-secondary) text-white md:hidden"
              aria-label="Toggle navigation menu"
              onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-(--pet-accent)/30 pb-5 pt-4 md:hidden">
            <nav className="grid gap-2 font-poppins text-sm font-bold">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} className={navLinkClass} onClick={closeMobileMenu}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/dashboard" className={navLinkClass} onClick={closeMobileMenu}>
                Dashboard
              </NavLink>
            </nav>
            <div className="mt-4 grid grid-cols-2 gap-3 font-poppins text-sm font-bold">
              <Link to="/login" className="rounded-full bg-white px-4 py-3 text-center text-(--pet-secondary) shadow" onClick={closeMobileMenu}>
                Login
              </Link>
              <Link to="/register" className="rounded-full bg-(--pet-secondary) px-4 py-3 text-center text-white shadow" onClick={closeMobileMenu}>
                Register
              </Link>
            </div>
            {currentUser && (
              <div className="mt-4 rounded-[22px] bg-white p-4 font-poppins shadow">
                <div className="flex items-center gap-3">
                  <img src={currentUser.photoURL} alt={currentUser.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-extrabold text-(--pet-secondary)">{currentUser.name}</p>
                    <p className="text-xs text-(--pet-dark)">{currentUser.email}</p>
                  </div>
                </div>
                <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-(--pet-light) px-4 py-3 font-bold text-(--pet-secondary)">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
