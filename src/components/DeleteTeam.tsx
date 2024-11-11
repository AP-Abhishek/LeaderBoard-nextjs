"use client"

import React, { useEffect, useState } from 'react'
import $ from 'jquery';

interface DeleteTeamProp {
  onDeleteTeam: (name: string) => void;
}

export default function DeleteTeam({ onDeleteTeam }: DeleteTeamProp) {

  const [name, setName] = useState('');

  const handleDelte = (e: React.FormEvent) => {
    e.preventDefault();
    onDeleteTeam(name);
    setName("");
    $('.delTeam').slideUp(1000);
      $('.cancel').slideUp(1000);
  }

  useEffect (() => {
    $('.cancel').click(function() {
      $('.delTeam').slideUp(1000);
      $('.cancel').slideUp(1000);
    });
  })
  
  return (
    <div className='delTeam'>
      <form onSubmit={handleDelte}>
        <span className='cancel'>X</span>
        <label>Enter Team name to Delete: </label>
        <input type="text" id='delTeamName' value={name} onChange={(e) => { setName(e.target.value) }} />
        <button className='submit'>Delete Team</button>
      </form>
    </div>
  )
}
