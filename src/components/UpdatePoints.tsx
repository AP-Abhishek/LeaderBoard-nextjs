"use client"

import React, { useState } from 'react'
import $ from 'jquery'
import { toast } from 'react-toastify'
import { AllTeams } from '@/data/Teams'
import CustomDropdown from './CustomDropdown'

interface UpdatePointsProp {
  onUpdateTeam: (winTeam: string, lossTeam: string, tiePtsWin: number, tiePtsLoss: number) => void;
}

export default function UpdatePoints({ onUpdateTeam }: UpdatePointsProp) {

  const [winTeam, setWinTeam] = useState("");
  const [lossTeam, setLossTeam] = useState("");
  const [tiePtsWin, setTiePtsWin] = useState<number | ''>(0);
  const [tiePtsLoss, setTiePtsLoss] = useState<number | ''>(0);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const winTie = typeof tiePtsWin === 'number' ? tiePtsWin : 0;
    const lossTie = typeof tiePtsLoss === 'number' ? tiePtsLoss : 0;

    if (String(winTie).length > 7 || String(lossTie).length > 7) {
      toast.error("Tie-breaker points cannot exceed 7 characters.", {
        theme: "colored"
      });
      return;
    }

    onUpdateTeam(winTeam, lossTeam, winTie, lossTie);
    setWinTeam('');
    setLossTeam('');
    setTiePtsWin(0);
    setTiePtsLoss(0);
    $('.updatepts').slideUp(300);
    $('.cancel').slideUp(300);
  }

  const handleCancel = () => {
    $('.updatepts').slideUp(300);
    $('.cancel').slideUp(300);
  }

  const teams = AllTeams();

  const winDropdownOptions = teams
    .filter(team => team.name !== lossTeam)
    .map(team => ({
      value: team.name,
      label: team.name
    }));

  const lossDropdownOptions = teams
    .filter(team => team.name !== winTeam)
    .map(team => ({
      value: team.name,
      label: team.name
    }));

  return (
    <div className='updatepts'>
      <form onSubmit={handleUpdate}>
        <span className='cancel' onClick={handleCancel}>X</span>
        <label>Winning Team:</label>
        <CustomDropdown
          options={winDropdownOptions}
          value={winTeam}
          onChange={(val) => setWinTeam(val)}
          placeholder="Select Winning Team"
        />

        <label>Losing Team:</label>
        <CustomDropdown
          options={lossDropdownOptions}
          value={lossTeam}
          onChange={(val) => setLossTeam(val)}
          placeholder="Select Losing Team"
        />

        <label>Tie-Breaker Points for Winning team:</label>
        <input
          type="number"
          min="0"
          value={tiePtsWin}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 7) return;
            setTiePtsWin(val === '' ? '' : Math.max(0, parseInt(val, 10) || 0));
          }}
        />

        <label>Tie-Breaker Points for Losing team:</label>
        <input
          type="number"
          min="0"
          value={tiePtsLoss}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 7) return;
            setTiePtsLoss(val === '' ? '' : Math.max(0, parseInt(val, 10) || 0));
          }}
        />

        <button className='submit'>Update Score</button>
      </form>
    </div>
  )
}
