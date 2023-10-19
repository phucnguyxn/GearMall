import React from 'react'
import logo from '../assets/logo.png'
import icons from '../ultis/icons'
import { Link } from 'react-router-dom'
import path from '../ultis/path'


const { RiPhoneFill, MdEmail, BsFillCartFill, HiMiniUserCircle } = icons
const Header = () => {
    return (
        <div className='border w-main flex justify-between h-[110px] py-[35px]'>
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className='w-[150px] object-contain' />
            </Link>
            <div className='flex text-[13px]'>
                <div className='flex flex-col px-6 border-r items-center'>
                    <span className='flex gap-4 items-center'>
                        <RiPhoneFill color='red' />
                        <span className='font-semibold'>(+0234)68686868</span>
                    </span>
                    <span>
                        Mon-Sat 8:00AM - 7:00PM
                    </span>
                </div>
                <div className='flex flex-col items-center px-6 border-r'>
                    <span className='flex gap-4 items-center'>
                        <MdEmail color='red' />
                        <span className='font-semibold'>support@techstore.com</span>
                    </span>
                    <span>
                        Online Support 24/7
                    </span>
                </div>
                <div className='flex items-center justify-center gap-2 px-6 border-r'>
                    <BsFillCartFill color='red' />
                    <span>0 item(s)</span>
                </div>
                <div className='flex items-center justify-center px-6'><HiMiniUserCircle size={24} /> </div>
            </div>
        </div>
    )
}

export default Header