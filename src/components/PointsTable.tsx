'use client';

import React, { useLayoutEffect, useRef } from 'react'

type TeamStats = {
    id: number,
    name: string,
    matches: number,
    wins: number,
    loss: number,
    tieBreaker: number,
    points: number
}

interface PointsTableProps {
    teams: TeamStats[];
}

export default function PointsTable({ teams }: PointsTableProps) {
    const prevPositionsRef = useRef<Map<number, number>>(new Map());

    useLayoutEffect(() => {
        const prevPositions = prevPositionsRef.current;

        teams.forEach((team) => {
            const el = document.getElementById(`team-row-${team.id}`);
            if (!el) return;

            const newTop = el.getBoundingClientRect().top;
            const prevTop = prevPositions.get(team.id);

            if (prevTop !== undefined && Math.abs(prevTop - newTop) > 2) {
                const deltaY = prevTop - newTop;

                el.style.transform = `translateY(${deltaY}px)`;
                el.style.transition = 'none';
                el.classList.add('rank-swap-active');

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        el.style.transition = 'transform 0.55s cubic-bezier(0.2, 1, 0.3, 1)';
                        el.style.transform = '';
                    });
                });

                setTimeout(() => {
                    el.classList.remove('rank-swap-active');
                }, 700);
            }

            prevPositions.set(team.id, newTop);
        });

        const activeIds = new Set(teams.map(t => t.id));
        for (const id of Array.from(prevPositions.keys())) {
            if (!activeIds.has(id)) {
                prevPositions.delete(id);
            }
        }
    }, [teams]);

    return (
        <div className="table-container">
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
                                    <tr key={Team.id} id={`team-row-${Team.id}`} className='table-row-item'>
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
        </div>
    )
}
