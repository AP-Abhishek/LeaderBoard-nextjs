"use client"

import React, { useState } from 'react'
import $ from 'jquery'
import { toast } from 'react-toastify'
import { getWinPoints, setWinPoints, getTournamentName, setTournamentName, exportTournamentData, importTournamentData } from '@/data/Teams'

interface SettingsProp {
  onDataImported: () => void;
  onWinPointsChange: (pts: number) => void;
  onTournamentNameChange: (name: string) => void;
}

export default function Settings({ onDataImported, onWinPointsChange, onTournamentNameChange }: SettingsProp) {
  const [tournamentNameInput, setTournamentNameInput] = useState(getTournamentName());
  const [winPts, setWinPts] = useState<number | ''>(getWinPoints());

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = tournamentNameInput.trim();
    if (trimmedName.length > 30) {
      toast.error("Tournament name cannot exceed 30 characters.", { theme: 'colored' });
      return;
    }

    setTournamentName(trimmedName);
    onTournamentNameChange(getTournamentName());

    const parsedWinPts = typeof winPts === 'number' ? winPts : 2;
    if (String(parsedWinPts).length > 7) {
      toast.error("Win points cannot exceed 7 digits.", { theme: 'colored' });
      return;
    }

    setWinPoints(parsedWinPts);
    onWinPointsChange(getWinPoints());

    toast.success("Settings updated successfully.", { theme: 'colored' });
    $('.settings').slideUp(300);
    $('.cancel').slideUp(300);
  }

  const handleCancel = () => {
    $('.settings').slideUp(300);
    $('.cancel').slideUp(300);
  }

  const handleExport = () => {
    exportTournamentData();
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const success = importTournamentData(json);
        if (success) {
          const updatedName = getTournamentName();
          const updatedPts = getWinPoints();
          setTournamentNameInput(updatedName);
          setWinPts(updatedPts);
          onTournamentNameChange(updatedName);
          onWinPointsChange(updatedPts);
          onDataImported();
          $('.settings').slideUp(300);
          $('.cancel').slideUp(300);
        }
      } catch {
        toast.error("Failed to parse JSON file.", { theme: 'colored' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className='settings'>
      <form onSubmit={handleSaveSettings}>
        <span className='cancel' onClick={handleCancel}>X</span>
        <h3>Settings</h3>

        <label>Tournament Name:</label>
        <input
          type="text"
          maxLength={30}
          value={tournamentNameInput}
          onChange={(e) => setTournamentNameInput(e.target.value)}
          placeholder="Enter Tournament Name"
        />

        <label>Points per Win:</label>
        <input
          type="number"
          min="1"
          max="9999999"
          value={winPts}
          onChange={(e) => {
            const val = e.target.value;
            if (val.length > 7) return;
            setWinPts(val === '' ? '' : Math.max(1, parseInt(val, 10) || 1));
          }}
        />
        <button className='submit' type='submit'>Save Settings</button>
      </form>

      <div className="settings-data-section">
        <label>Tournament Data:</label>
        <button className='submit export-btn' type='button' onClick={handleExport}>
          Export Data (JSON)
        </button>

        <label className='import-label' htmlFor='import-json-file'>
          Import Data (JSON)
        </label>
        <input
          type="file"
          id="import-json-file"
          accept=".json,application/json"
          style={{ display: 'none' }}
          onChange={handleFileImport}
        />
      </div>
    </div>
  )
}
