"use client"

import React, { useState } from 'react'
import $ from 'jquery';
import { AllTeams } from '@/data/Teams';
import CustomDropdown from './CustomDropdown';

interface DeleteTeamProp {
  onDeleteTeam: (name: string) => void;
}

export default function DeleteTeam({ onDeleteTeam }: DeleteTeamProp) {

  const [name, setName] = useState('');

  const handleDelte = (e: React.FormEvent) => {
    e.preventDefault();
    onDeleteTeam(name);
    setName("");
    $('.delTeam').slideUp(300);
    $('.cancel').slideUp(300);
  }

  const handleCancel = () => {
    $('.delTeam').slideUp(300);
    $('.cancel').slideUp(300);
  }

  const teams = AllTeams();
  const dropdownOptions = teams.map(team => ({
    value: team.name,
    label: team.name
  }));

  return (
    <div className='delTeam'>
      <form onSubmit={handleDelte}>
        <span className='cancel' onClick={handleCancel}>X</span>
        <label>Select Team to Delete: </label>
        <CustomDropdown
          options={dropdownOptions}
          value={name}
          onChange={(val) => setName(val)}
          placeholder="Select Team"
          id="delTeamName"
        />
        <button className='submit'>Delete Team</button>
      </form>
    </div>
  )
}
