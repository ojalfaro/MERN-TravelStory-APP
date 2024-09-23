import React from 'react'
import ProfileInfo from '../components/Cards/ProfileInfo'

import LOGO from '../assets/images/logo.svg'
import { useNavigate } from 'react-router-dom'

const Navbar = ({userInfo}) => {

    const isToken = localStorage.getItem("token")
    const navigate = useNavigate()
    const onlogout = () => {
        localStorage.clear()
    navigate("/login")
    }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10'>
      <img src={LOGO} alt='travel story' className='h-9' />

         
       {isToken && <ProfileInfo userInfo={userInfo} onlogout={onlogout}/> }
    </div>
  )
}

export default Navbar
