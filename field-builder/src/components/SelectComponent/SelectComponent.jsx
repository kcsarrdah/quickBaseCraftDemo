import React from 'react';

function Select({ label, id, name, options }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} name={name}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
