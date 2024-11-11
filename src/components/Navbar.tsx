"use client"

import React, { useEffect } from 'react'
import $ from 'jquery'

export default function Navbar() {

  useEffect(() => {

    const at = document.getElementById('add-team');
    const dt = document.getElementById('delete-team');
    const up = document.getElementById('update-pts');

    at?.addEventListener("click", () => {
      $('.addTeam').slideDown(1000);
      $('.cancel').slideDown(1000);
    });

    dt?.addEventListener("click", () => {
      $('.delTeam').slideDown(1000);
      $('.cancel').slideDown(1000);
    });

    up?.addEventListener("click", () => {
      $('.updatepts').slideDown(1000);
      $('.cancel').slideDown(1000);
    });
  });

  return (
    <div className='navbar'>
      <ul>
        <li><button id='add-team'>Add Team</button></li>
        <li><button id='delete-team'>Delete Team</button></li>
        <li><button id='update-pts'>Update Points</button></li>
      </ul>
    </div>
  )
}
