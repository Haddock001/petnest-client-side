import React from 'react'
import logo from '../assets/logo.png'
import { PiCopyrightLight } from "react-icons/pi";

const Footer = () => {
  return (
    <div className="flex flex-col mt-40 items-center outline border-(--pet-secondary) pb-20 border-t">
      <img src={logo} className='w-29'/>
      <h1 className='font-poppins text-lg flex'>Copyright <PiCopyrightLight /> Petnest 2025</h1>
      <nav className='flex font-poppins gap-10 mt-10'>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
    </div>
  )
}

export default Footer