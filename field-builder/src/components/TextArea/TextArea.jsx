import React from 'react';

function TextArea({ label, id, name, required, rows, cols }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <textarea id={id} name={name} required={required} rows={rows} cols={cols} />
    </div>
  );
}

export default TextArea;
