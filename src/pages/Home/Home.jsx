import React from 'react'
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from './Banner';
import { Link } from 'react-router-dom';
function Home() {
    useEffect(() => {
        AOS.init();
    }, [])
    window.addEventListener('resize', () => {
        AOS.refresh();
        console.log('resizing')
    })
    return (
        <div style={{ overflowX: 'hidden' }} className='min-h-screen'>
            <Banner />
            <div data-aos="fade-down" data-aos-duration="2000">

            </div>
        </div>
    )
}

export default Home;