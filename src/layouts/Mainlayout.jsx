import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'

const Mainlayout = () => {
  return (
    <div className='bg-pet-primary'>
              <Navbar></Navbar>
              <Outlet></Outlet>
              <Footer></Footer>
    </div>
  )
}

export default Mainlayout