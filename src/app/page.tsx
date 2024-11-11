'use client'

import React, { useState } from 'react'
import Heading from '@/components/Heading'
import PointsTable from '@/components/PointsTable'
import SideBar from '@/components/Sidebar'
import { ToastContainer, Bounce } from 'react-toastify'
import "react-toastify/ReactToastify.css"
import '@/styles/global.css'
import { AllTeams, addTeam, deleteTeam, updateTeam } from '@/data/Teams'
import Congrats from '@/components/Congrats'

export default function Home() {

    type TeamStats = {
        id: number,
        name: string,
        matches: number,
        wins: number,
        loss: number,
        tieBreaker: number,
        points: number
    }

    const [Teams, setTeams] = useState(AllTeams());

    const handleAddTeam = (newTeam: TeamStats) => {
        addTeam(newTeam);
        setTeams([...Teams, newTeam]);
    }

    const handleDeleteTeam = (name: string) => {
        deleteTeam(name);
        setTeams(Teams.filter(Team => Team.name != name));
    }

    const handleUpdateTeam = (winTeam: string, lossTeam: string, tiePtsWin: number, tiePtsLoss: number) => {
        updateTeam(winTeam, lossTeam, tiePtsWin, tiePtsLoss);
        setTeams([...Teams]);
    }

    return (
        <>
            <Heading />
            <div className="body">
                <PointsTable />
                <SideBar
                    onAddTeam={handleAddTeam}
                    onDeleteTeam={handleDeleteTeam}
                    onUpdateTeam={handleUpdateTeam}
                />
            </div>
            <Congrats />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="coloured"
                transition={Bounce}
            />
        </>
    )
}

