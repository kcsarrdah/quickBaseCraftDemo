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
    <div className="row form-group align-items-center">
        <label htmlFor={id} className="col-md-2">{label}</label>
        <div className="col-md-10">
            <select
                className="form-control"
                id={id}
                name={name}
                value={selectedValue} 
                onChange={handleSelectChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    </div>
  );
}

export default Select;
