'use client';

import React from 'react'
import { AllTeams } from '@/data/Teams';

export default function PointsTable() {
    const teams = AllTeams();

    return (
        <div className="table">
            <table id='points-table'>
                <thead>
                    <tr className='table-head'>
                        <th>
                            <span className="desktop-text">Position</span>
                            <span className="mobile-text">Pos</span>
                        </th>
                        <th>Name</th>
                        <th>
                            <span className="desktop-text">Matches</span>
                            <span className="mobile-text">M</span>
                        </th>
                        <th>
                            <span className="desktop-text">Wins</span>
                            <span className="mobile-text">W</span>
                        </th>
                        <th>
                            <span className="desktop-text">Loss</span>
                            <span className="mobile-text">L</span>
                        </th>
                        <th>
                            <span className="desktop-text">Tie-Breaker</span>
                            <span className="mobile-text">TB</span>
                        </th>
                        <th>
                            <span className="desktop-text">Points</span>
                            <span className="mobile-text">Pts</span>
                        </th>
                    </tr>
                </thead>
                <tbody id='points-table-body'>
                    {
                        teams.length === 0 ? (
                            <tr className='empty-row'>
                                <td colSpan={7} className='empty-cell'>
                                    No teams added yet. Click &apos;Add&apos; to get started!
                                </td>
                            </tr>
                        ) : (
                            teams.map((Team, index) => (
                                <tr key={Team.id}>
                                    <td>{index + 1}</td>
                                    <td>{Team.name}</td>
                                    <td>{Team.matches}</td>
                                    <td>{Team.wins}</td>
                                    <td>{Team.loss}</td>
                                    <td>{Team.tieBreaker}</td>
                                    <td>{Team.points}</td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
