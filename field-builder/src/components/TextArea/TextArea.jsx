import React, { useState, useEffect } from 'react';

function TextArea({ label, id, name, required, rows, cols }) {
  const [textValue, setTextValue] = useState('');
  const maxCharacters = 40; // Define the maximum character limit

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
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <textarea
          id={id}
          name={name}
          required={required}
          rows={rows}
          cols={cols}
          value={textValue.text}
          onChange={handleTextAreaChange} // Handle textarea changes
        />
        {textValue.excessCharacters && (
          <span className="highlight">{textValue.excessCharacters}</span>
        )}
      </div>
      <style>
        {`
          .highlight {
            color: red; // Change the font color to red for excess characters
          }
        `}
      </style>
    </div>
  );
}

export default TextArea;
