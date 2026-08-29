"use client"

import React from 'react'
import $ from 'jquery'

export default function Navbar() {

  const handleAddClick = () => {
    $('.delTeam, .updatepts').slideUp(200);
    $('.addTeam').slideToggle(300);
    $('.cancel').slideDown(300);
  };

  const handleDeleteClick = () => {
    $('.addTeam, .updatepts').slideUp(200);
    $('.delTeam').slideToggle(300);
    $('.cancel').slideDown(300);
  };

  const handleUpdateClick = () => {
    $('.addTeam, .delTeam').slideUp(200);
    $('.updatepts').slideToggle(300);
    $('.cancel').slideDown(300);
  };

  return (
    <div className='navbar'>
      <ul>
        <li><button id='add-team' onClick={handleAddClick}>Add</button></li>
        <li><button id='delete-team' onClick={handleDeleteClick}>Delete</button></li>
        <li><button id='update-pts' onClick={handleUpdateClick}>Update</button></li>
      </ul>
    </div>
  )
}
