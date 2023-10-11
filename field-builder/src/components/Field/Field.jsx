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
    <div className="row form-group align-items-center">
        <label htmlFor={id} className="col-md-2">{label}</label>
        <div className="col-md-10">
            <input
                type={type}
                className="form-control"
                id={id}
                name={name}
                placeholder={placeholder}
                required={required}
                value={fieldValue}
                onChange={handleInputChange}
            />
        </div>
    </div>
  );
}

export default Field;
