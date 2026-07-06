import React from 'react'
import { FaUserDoctor } from "react-icons/fa6";


const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <a href='#' style={{ display: 'flex', alignItems: 'center', fontSize: '1.2em' }}>
            <FaUserDoctor style={{ marginRight: '8px' }} />Prescripto
          </a>
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>Digital HealthCare for Everyone

            Revolutionizing Healthcare, Virtually. Experience seamless access to trusted healthcare workers and personalized care anytime, anywhere with our innovative telemedicine platform.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+234 000 000 000</li>
            <li>prescripto@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ prescripto.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
