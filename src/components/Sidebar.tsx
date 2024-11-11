'use client'

import React from 'react'
import AddTeam from './AddTeam';
import DeleteTeam from './DeleteTeam';
import UpdatePoints from './UpdatePoints';
import JSConfetti from 'js-confetti';

import { AllTeams } from '@/data/Teams';

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

const endTournament = () => {
  const msg = document.getElementById('congrats-message');
  msg?.classList.remove('hidden');
  const confetti = new JSConfetti();
  confetti.addConfetti({
    confettiRadius: 7,
    confettiNumber: 550
  });
}

export default function SideBar({ onAddTeam, onDeleteTeam, onUpdateTeam }: SideBarProp) {

  let idx = 1;

  return (
    <div className='sidebar'>
      <h3>Top 3</h3>
      <table id='side-table'>
        <thead>
          <tr className='table-head'>
            <th>Rank</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {
            AllTeams().slice(0, 3).map((Team) => (
              <tr key={Team.id}>
                <th>{idx++}</th>
                <th>{Team.name}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="extra-actions">
        <p>
          LeaderBoard
        </p>
        <ol>
          <li>Add New Teams to begin the Tournament.</li>
          <li>Delete Team if not required.</li>
          <li>Update Points after every match.</li>
          <li>By Default it adds 2 points on wins.</li>
          <li>Editing is not allowed.</li>
          <li>Click Qualifiers to element disqualified Teams</li>
          <li>Click End to end the Tournament.</li>
        </ol>
        <p>
          Have Fun || All the Best to Every Team
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
