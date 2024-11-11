"use client"

import { updateTeam } from '@/data/Teams';
import React, { useEffect, useState } from 'react'
import $ from 'jquery'

interface UpdatePointsProp {
  onUpdateTeam: (winTeam: string, lossTeam: string, tiePtsWin: number, tiePtsLoss: number) => void;
}

export default function UpdatePoints({ onUpdateTeam }: UpdatePointsProp) {

  const [winTeam, setWinTeam] = useState("");
  const [lossTeam, setLossTeam] = useState("");
  const [tiePtsWin, setTiePtsWin] = useState(0);
  const [tiePtsLoss, setTiePtsLoss] = useState(0);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTeam(winTeam, lossTeam, tiePtsWin, tiePtsLoss);
    setWinTeam('');
    setLossTeam('');
    setTiePtsWin(0);
    setTiePtsLoss(0);
    $('.updatepts').slideUp(1000);
    $('.cancel').slideUp(1000);
  }

  useEffect (() => {
    $('.cancel').click(function() {
      $('.updatepts').slideUp(1000);
      $('.cancel').slideUp(1000);
    });
  })

  return (
    <div className='updatepts'>
      <form onSubmit={handleUpdate}>
        <span className='cancel'>X</span>
        <label>Winning Team:</label>
        <input type="text" value={winTeam} onChange={(e) => { setWinTeam(e.target.value) }} />
        <label>Lossing Team:</label>
        <input type="text" value={lossTeam} onChange={(e) => { setLossTeam(e.target.value) }} />
        <label>Tie-Breaker Points for Winning team:</label>
        <input type="text" value={tiePtsWin} onChange={(e) => { setTiePtsWin(parseInt(e.target.value)) }} />
        <label>Tie-Breaker Points for Lossing team:</label>
        <input type="text" value={tiePtsLoss} onChange={(e) => { setTiePtsLoss(parseInt(e.target.value)) }} />
        <button className='submit'>Update Score</button>
      </form>
    </div>
  )
}
