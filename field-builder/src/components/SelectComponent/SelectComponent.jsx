import React, { useState, useEffect } from 'react';

function Select({ label, id, name, options }) {
  const [selectedValue, setSelectedValue] = useState('');

  // Function to handle select changes
  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    localStorage.setItem(id, value); // Save the value to localStorage
  };

  useEffect(() => {
    const savedValue = localStorage.getItem(id);
    if (savedValue !== null) {
      setSelectedValue(savedValue);
    }
  }, [id]);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={selectedValue} // Set the select value from state
        onChange={handleSelectChange} // Handle select changes
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
