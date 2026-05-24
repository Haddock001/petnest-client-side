import { Outlet } from 'react-router'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const Mainlayout = () => {

  return (
    <div className='bg-pet-primary'>
      <Navbar/>
      <div className='scroll-container'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Mainlayout