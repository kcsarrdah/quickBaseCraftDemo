import React, { useState } from 'react';

const CustomTextArea = () => {
  const maxLength = 40;

  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    const newText = event.target.innerText;

    if (newText.length <= maxLength) {
      setText(newText);
    } else {
      // If excess text exists, split the text and apply styling to excess characters
      const overflowText = newText.slice(maxLength);
      const highlightedText = (
        <span>
          {newText.slice(0, maxLength)}
          <span className="highlight">{overflowText}</span>
        </span>
      );
      setText(highlightedText);
    }
  };

  return (
    <div>
      <label>Custom TextArea</label>
      <div
        contentEditable
        onInput={handleTextChange}
        className="custom-text-area"
      >
        {text}
      </div>
      <div>
        Character Limit: {text.length}/{maxLength}
      </div>
    </div>
  );
};

export default CustomTextArea;
