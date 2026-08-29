"use client"

import React from 'react'
import $ from 'jquery'

export default function Navbar() {

  const handleAddClick = () => {
    $('.delTeam, .updatepts, .settings').slideUp(200);
    $('.addTeam').slideToggle(300);
    $('.cancel').slideDown(300);
  };

  const handleDeleteClick = () => {
    $('.addTeam, .updatepts, .settings').slideUp(200);
    $('.delTeam').slideToggle(300);
    $('.cancel').slideDown(300);
  };

  const handleUpdateClick = () => {
    $('.addTeam, .delTeam, .settings').slideUp(200);
    $('.updatepts').slideToggle(300);
    $('.cancel').slideDown(300);
  };

  const handleSettingsClick = () => {
    $('.addTeam, .delTeam, .updatepts').slideUp(200);
    $('.settings').slideToggle(300);
    $('.cancel').slideDown(300);
  };

  return (
    <div className='navbar'>
      <ul>
        <li className='nav-add'><button id='add-team' onClick={handleAddClick}>Add</button></li>
        <li className='nav-del'><button id='delete-team' onClick={handleDeleteClick}>Delete</button></li>
        <li className='nav-update'><button id='update-pts' onClick={handleUpdateClick}>Update</button></li>
        <li className='nav-settings'><button id='settings-btn' onClick={handleSettingsClick}>Settings</button></li>
      </ul>
    </div>
  )
}
