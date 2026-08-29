"use client"

import React, { useState, useEffect, useRef } from 'react'

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export default function CustomDropdown({ options, value, onChange, placeholder = 'Select Option', id }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="custom-dropdown-container" ref={dropdownRef} id={id}>
      <div 
        className={`custom-dropdown-header ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="dropdown-arrow">▼</span>
      </div>
      <div className={`custom-dropdown-menu ${isOpen ? 'visible' : ''}`}>
        <div 
          className={`custom-dropdown-item ${value === '' ? 'selected' : ''}`}
          onClick={() => handleSelect('')}
        >
          {placeholder}
        </div>
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`custom-dropdown-item ${value === opt.value ? 'selected' : ''}`}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
