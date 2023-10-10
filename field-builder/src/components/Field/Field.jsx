import React, { useState, useEffect } from 'react';

function Field({ label, id, name, type, placeholder, required }) {
  const [fieldValue, setFieldValue] = useState('');

  // Function to handle input changes
  const handleInputChange = (event) => {
    const value = event.target.value;
    setFieldValue(value);
    localStorage.setItem(id, value); // Save the value to localStorage
  };

  // Effect to set the field value from localStorage on component mount
  useEffect(() => {
    const savedValue = localStorage.getItem(id);
    if (savedValue !== null) {
      setFieldValue(savedValue);
    }
  }, [id]);

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        value={fieldValue} // Set the input value from state
        onChange={handleInputChange} // Handle input changes
      />
    </div>
  );
}

export default Field;
