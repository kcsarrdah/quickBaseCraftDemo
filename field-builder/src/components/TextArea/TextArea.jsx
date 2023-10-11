import React, { useState, useEffect } from 'react';

function TextArea({ label, id, name, required, rows, cols }) {
  const [textValue, setTextValue] = useState('');
  const maxCharacters = 40; // Define the maximum character limit
  
  const styles = {
    noPadding: {
      paddingLeft: 0
    }
  };

  // Function to handle textarea changes
  const handleTextAreaChange = (event) => {
    const value = event.target.value;
    const excessCharacters = value.slice(maxCharacters);

    setTextValue({ text: value, excessCharacters });
    localStorage.setItem(id, value); // Save the value to localStorage
  };

  useEffect(() => {
    const savedValue = localStorage.getItem(id);
    if (savedValue !== null) {
      setTextValue({ text: savedValue, excessCharacters: savedValue.slice(maxCharacters) });
    }
  }, [id]);

  return (
<div className="row form-group align-items-center">
    <label className="col-md-2" htmlFor={id}>{label}</label>
    <div className="col-md-8" style={styles.noPadding}>
        <textarea
          className="form-control"
          id={id}
          name={name}
          required={required}
          rows={rows}
          value={textValue.text}
          onChange={handleTextAreaChange}
        />
        {textValue.excessCharacters && (
          <span className="text-danger d-block mt-2">{textValue.excessCharacters}</span>
        )}
    </div>
</div>
  );
}

export default TextArea;
