import React, { useState, useEffect } from 'react';

function Checkbox({ label, id, name }) {
  const [isChecked, setIsChecked] = useState(false);

  // Function to handle checkbox changes
  const handleCheckboxChange = (event) => {
    const value = event.target.checked;
    setIsChecked(value);
    localStorage.setItem(id, value); // Save the value to localStorage
  };

  useEffect(() => {
    const savedValue = localStorage.getItem(id);
    if (savedValue !== null) {
      setIsChecked(savedValue === 'true'); // Parse the saved value as a boolean
    }
  }, [id]);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={isChecked} // Set the checkbox state from state
          onChange={handleCheckboxChange} // Handle checkbox changes
        />
        <span className="required-text">A Value is required</span>
      </div>
    </div>
  );
}

export default Checkbox;
