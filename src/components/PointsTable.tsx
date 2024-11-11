'use client';

import React from 'react'
import { AllTeams } from '@/data/Teams';

export default function PointsTable() {
    
    let pos = 1;

    return (
        <div className="table">
            <table id='points-table'>
                <thead>
                    <tr className='table-head'>
                        <th>Position</th>
                        <th>Name</th>
                        <th>Matches</th>
                        <th>Wins</th>
                        <th>Loss</th>
                        <th>Tie-Breaker</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody id='points-table-body'>
                    {
                        AllTeams().map((Team) => (
                            <tr key={Team.id}>
                                <td>{pos++}</td>
                                <td>{Team.name}</td>
                                <td>{Team.matches}</td>
                                <td>{Team.wins}</td>
                                <td>{Team.loss}</td>
                                <td>{Team.tieBreaker}</td>
                                <td>{Team.points}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
