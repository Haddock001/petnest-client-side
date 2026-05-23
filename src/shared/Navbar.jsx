import React from 'react'
import logo from '../assets/logo.png'
import { useNavbarVisibility } from '../hooks/useNavbarVisibility'

const Navbar = () => {
  const isVisible = useNavbarVisibility();

  return (
    <div className={`navbar shadow-lg rounded-2xl bg-pet-primary px-5 fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } lg:rounded-none lg:transition-transform lg:duration-300`}>
      <div className="flex items-center w-full py-3 lg:py-2">
        <div className="navbar-start flex items-center">
          <img src={logo} className='w-10 h-10' alt="" />
        </div>

        <nav className="hidden lg:flex lg:mx-auto lg:space-x-8 items-center">
          <a href="/" className="text-sm font-medium text-(--pet-secondary) hover:text-(--pet-accent)">Home</a>
          <a href="/services" className="text-sm font-medium text-(--pet-secondary) hover:text-(--pet-accent)">Services</a>
          <a href="/pettip" className="text-sm font-medium text-(--pet-secondary) hover:text-(--pet-accent)">Pet Tip</a>
          <a href="/addpet" className="text-sm font-medium text-(--pet-secondary) hover:text-(--pet-accent)">Add Pet</a>
          <a href="/contact" className="text-sm font-medium text-(--pet-secondary) hover:text-(--pet-accent)">Contact</a>
        </nav>

        <div className="navbar-end ml-auto flex items-center">
          <div className="lg:hidden">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow">
                <li><a href="/">Homepage</a></li>
                <li><a href="/pets">Pets</a></li>
                <li><a>About</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar