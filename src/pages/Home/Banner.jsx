import React from 'react'
import { Link } from 'react-router-dom'
import image from '../../asset/images/banner.png'
function Banner() {
    return (
        <div>
            <div className='relative'>
                <div data-aos="zoom-in" data-aos-duration="2000">
                    <img src={image} className='lg:h-[650px] mx-auto brightness-110' alt="" />
                </div>
                <div className='absolute left-20 top-32 lg:block hidden'>
                    <p className='text-4xl text-amber-400 font-bold my-4'>Your Schedule</p>
                    <p className='text-2xl text-black dark:text-slate-300'>Stay with us</p>
                    <Link to='/booking' className='btn mt-6 bg-amber-400 border-0 text-slate-100 shadow-md dark:hover:border-white dark:hover:border'>Book Now</Link>
                </div>
                <div className='flex flex-col w-full justify-center items-center lg:hidden'>
                    <p className='text-2xl text-amber-400 font-bold'>Your Schedule</p>
                    <p className='text-xl text-black dark:text-slate-300'>Stay with us</p>
                    <Link to='/booking' className='btn-sm btn mt-2 bg-amber-400 border-0 text-slate-100 shadow-md dark:hover:border-white dark:hover:border'>Book Now</Link>
                </div>
            </div>
        </div>
    )
}

export default Banner