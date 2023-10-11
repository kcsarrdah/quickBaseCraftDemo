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
<div className="row form-group align-items-center">
    <label className="col-md-4" htmlFor={id}>Type</label>
    
    <label className="col-md-3 custom-control-label" htmlFor={id}>{label}</label>
    
    <div className="col-md-1">
        <div className="custom-control custom-checkbox">
            <input
                type="checkbox"
                className="custom-control-input"
                id={id}
                name={name}
                checked={isChecked} 
                onChange={handleCheckboxChange}
            />
        </div>
    </div>
    
    <span className="text-danger col-md-4">A Value is required</span>
</div>

  );
}

export default Checkbox;
