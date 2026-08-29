import { AllTeams } from '@/data/Teams';
import React from 'react'
import Image from 'next/image';

import Medal from "../../public/medal.png"

export default function Congrats() {
  const topTeam = AllTeams()[0];

  return (
    <div id='congrats-message' className='hidden'>
      <div className="inner-congrats-message">
        <div className="header-message">
          <Image src={Medal} alt='Medal' id='medal'></Image>
          <h1>Congratulations</h1>
        </div>
        <div className="body-message">
          <h2>{topTeam ? topTeam.name : 'Winner'}</h2>
          <p>on winning the tournament with <b>{topTeam ? topTeam.points : 0}</b> points and getting the <b>1st</b> Rank.</p>

          <button onClick={() => window.location.reload()} id='new-tournament'>Start New Tournament</button>
        </div>
      </div>
    </div>
  )
}
