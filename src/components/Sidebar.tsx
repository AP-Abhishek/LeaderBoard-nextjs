'use client'

import React from 'react'
import AddTeam from './AddTeam';
import DeleteTeam from './DeleteTeam';
import UpdatePoints from './UpdatePoints';
import JSConfetti from 'js-confetti';
import { toast } from 'react-toastify';
import { AllTeams, canEndTournament } from '@/data/Teams';

interface SideBarProp {
  onAddTeam: (newTeam: {
    id: number,
    name: string,
    matches: number,
    wins: number,
    loss: number,
    tieBreaker: number,
    points: number
  }) => void;
  onDeleteTeam: (name: string) => void;
  onUpdateTeam: (winTeam: string, lossTeam: string, tiePtsWin: number, tiePtsLoss: number) => void;
}

export default function SideBar({ onAddTeam, onDeleteTeam, onUpdateTeam }: SideBarProp) {

  const endTournament = () => {
    const check = canEndTournament();
    if (!check.allowed) {
      toast.error(check.message, {
        theme: 'colored'
      });
      return;
    }

    const msg = document.getElementById('congrats-message');
    msg?.classList.remove('hidden');
    const confetti = new JSConfetti();
    confetti.addConfetti({
      confettiRadius: 7,
      confettiNumber: 550
    });
  }

  const teams = AllTeams();
  const totalMatches = Math.floor(teams.reduce((acc, t) => acc + t.matches, 0) / 2);
  const leader = teams.length > 0 ? teams[0] : null;

  return (
    <div className='sidebar'>
      <h3>Tournament Overview</h3>
      <div className="overview-card">
        <div className="overview-row">
          <span className="overview-label">Total Teams:</span>
          <span className="overview-value">{teams.length}</span>
        </div>
        <div className="overview-row">
          <span className="overview-label">Matches Played:</span>
          <span className="overview-value">{totalMatches}</span>
        </div>
        <div className="overview-row">
          <span className="overview-label">Current Leader:</span>
          <span className="overview-value leader-name">{leader ? `${leader.name} (${leader.points} pts)` : 'None'}</span>
        </div>
      </div>
      <div className="extra-actions">
        <p>
          Rules & Guidelines
        </p>
        <ol>
          <li>Add teams to begin (+2 points awarded per win).</li>
          <li>Select winning and losing teams to update scores.</li>
          <li>Teams are automatically ranked by Points, then Tie-Breakers.</li>
          <li>Team names are limited to a max of 20 characters and must be unique.</li>
          <li>Winning and losing teams cannot be the same team.</li>
          <li>Tie-breaker points are limited to a max of 7 digits.</li>
          <li>Live Tournament Safety: Refreshing or reloading the page will lose all data.</li>
          <li>Click &apos;End Tournament&apos; when all matches finish to crown the winner.</li>
        </ol>
        <p>
          Good luck to all teams!
        </p>
        <div className="functionality">
          <button id='end' onClick={endTournament}>End Tournament</button>
        </div>
      </div>
      <AddTeam onAddTeam={onAddTeam} />
      <DeleteTeam onDeleteTeam={onDeleteTeam} />
      <UpdatePoints onUpdateTeam={onUpdateTeam} />
    </div>
  )
}
