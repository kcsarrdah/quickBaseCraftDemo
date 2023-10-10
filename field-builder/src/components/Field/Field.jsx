import React from 'react';

function Field({ label, id, name, type, placeholder, required }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

export default Field;
