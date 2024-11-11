import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import Logo from '../../public/winner.png'

export default function Heading() {
    return (
        <div className='main-head'>
            <div className="head">
                <Image src={Logo} alt='Logo' id='logo'></Image>
                <h1 id='title'>LeaderBoard</h1>
            </div>
            <Navbar/>
        </div>
    )
}
