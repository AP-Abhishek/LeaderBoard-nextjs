"use client"

import React, { useState } from 'react'
import $ from 'jquery'
import { toast } from 'react-toastify'
import { getWinPoints, setWinPoints, exportTournamentData, importTournamentData } from '@/data/Teams'

interface SettingsProp {
  onDataImported: () => void;
  onWinPointsChange: (pts: number) => void;
}

export default function Settings({ onDataImported, onWinPointsChange }: SettingsProp) {
  const [winPts, setWinPts] = useState<number | ''>(getWinPoints());

  const handleSaveWinPoints = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = typeof winPts === 'number' ? winPts : 2;
    setWinPoints(parsed);
    onWinPointsChange(getWinPoints());
    toast.success(`Win points rule set to +${getWinPoints()} points.`, { theme: 'colored' });
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
          const updatedPts = getWinPoints();
          setWinPts(updatedPts);
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
      <form onSubmit={handleSaveWinPoints}>
        <span className='cancel' onClick={handleCancel}>X</span>
        <h3>Settings</h3>
        
        <label>Points per Win:</label>
        <input
          type="number"
          min="1"
          max="999"
          value={winPts}
          onChange={(e) => {
            const val = e.target.value;
            setWinPts(val === '' ? '' : Math.max(1, parseInt(val, 10) || 1));
          }}
        />
        <button className='submit' type='submit'>Save Rule</button>
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
