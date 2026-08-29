"use client"

import React, { useState } from 'react'
import { toast } from 'react-toastify';
import $ from 'jquery';
import { AllTeams } from '@/data/Teams';

interface AddTeamProp {
  onAddTeam: (newTeam: {
    id: number,
    name: string,
    matches: number,
    wins: number,
    loss: number,
    tieBreaker: number,
    points: number
  }) => void;
}

export default function AddTeam({ onAddTeam }: AddTeamProp) {

  const [name, setName] = useState("");
  const [nextID, setNextID] = useState(1);

  const handleAddTeam = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = name.trim();

    if (trimmed === "") {
      toast.error("Please enter a valid team name", {
        theme: "colored"
      });
      return;
    }

    if (trimmed.length > 20) {
      toast.error("Team name cannot exceed 20 characters", {
        theme: "colored"
      });
      return;
    }

    const teams = AllTeams();
    const exists = teams.filter(team => team.name.toLowerCase() === trimmed.toLowerCase());
    if (exists.length > 0) {
      toast.error("Team already exists", {
        theme: "colored"
      });
      return;
    }

    const newTeam = {
      id: nextID,
      name: trimmed,
      matches: 0,
      wins: 0,
      loss: 0,
      tieBreaker: 0,
      points: 0
    }
    onAddTeam(newTeam);
    toast.success("Team Created Successfully", {
      theme: "colored"
    });
    setName("");
    setNextID(nextID + 1);
    $(".addTeam").slideUp(300);
    $('.cancel').slideUp(300);
  }

  const handleCancel = () => {
    $('.addTeam').slideUp(300);
    $('.cancel').slideUp(300);
  }

  return (
    <div className='addTeam'>
      <form onSubmit={handleAddTeam}>
        <span className='cancel' onClick={handleCancel}>X</span>
        <label>Enter Team Name: </label>
        <input 
          type="text" 
          id='addedTeam' 
          maxLength={20} 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <button className='submit'>Add New Team</button>
      </form>
    </div>
  )
}
