import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Navigaion } from '../../components'

const Public = () => {
    return (
        <div className='w-full flex flex-col items-center'>
            <Header />
            <Navigaion />
            <div className='w-main'>
                <Outlet />
            </div>
        </div>
    )
}

export default Public