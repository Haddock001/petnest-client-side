import logo from '../assets/logo.png'
import { PiCopyrightLight } from "react-icons/pi";
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center border-t border-(--pet-secondary)/30 bg-pet-primary pb-16 pt-12">
      <img src={logo} className='w-29' alt="PetNest" />
      <h1 className='font-poppins text-lg flex'>Copyright <PiCopyrightLight /> Petnest 2025</h1>
      <nav className='flex font-poppins gap-10 mt-10'>
        <Link className="hover:text-(--pet-orange)" to='/'>Home</Link>
        <Link className="hover:text-(--pet-orange)" to='/pets'>Pets</Link>
        <Link className="hover:text-(--pet-orange)" to='/donations'>Donations</Link>
        <Link className="hover:text-(--pet-orange)" to='/dashboard'>Dashboard</Link>
      </nav>
    </footer>
  )
}

export default Footer
