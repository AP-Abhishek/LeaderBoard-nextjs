"use client"

import React, { useEffect, useState } from 'react'
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

    if (name == "") {
      toast.error("Invalid name", {
        theme: "colored"
      });
    } else {

      const teams = AllTeams();

      const exists = teams.filter(team => team.name.toLowerCase() == name.toLowerCase());
      if (exists.length > 0) {
        toast.error("Team already exists", {
          theme: "colored"
        });
        return;
      }

      const newTeam = {
        id: nextID,
        name: name,
        matches: 0,
        wins: 0,
        loss: 0,
        tieBreaker: 0,
        points: 0
      }
      onAddTeam(newTeam);
      toast.success("Team Created Succesfully", {
        theme: "colored"
      });
      setName("");
      setNextID(nextID + 1);
      $(".addTeam").slideUp(1000);
      $('.cancel').slideUp(1000);
    }
  }

  useEffect (() => {
    $('.cancel').click(function() {
      $('.addTeam').slideUp(1000);
      $('.cancel').slideUp(1000);
    });
  })

  return (
    <div className='addTeam'>
      <form onSubmit={handleAddTeam}>
        <span className='cancel'>X</span>
        <label>Enter Team Name: </label>
        <input type="text" id='addedTeam' value={name} onChange={(e) => setName(e.target.value)} />
        <button className='submit'>Add New Team</button>
      </form>
    </div>
  )
}
