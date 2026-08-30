import React from 'react';
import Navbar from './Navbar';
import Image from 'next/image';
import Logo from '../../public/winner.png'

interface HeadingProps {
    title: string;
}

export default function Heading({ title }: HeadingProps) {
    return (
        <>
            <div className='main-head'>
                <div className="app-brand">
                    <Image src={Logo} alt='Logo' id='logo'></Image>
                    <span id='app-name'>LeaderBoard</span>
                </div>
                <div className="tournament-title-container">
                    <h1 id='title'>{title}</h1>
                </div>
                <Navbar/>
            </div>
            <div className="mobile-tournament-banner">
                <h2>{title}</h2>
            </div>
        </>
    )
}
