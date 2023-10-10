import React from 'react';

function Checkbox({ label, id, name }) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <input type="checkbox" id={id} name={name} />
        <span className="required-text">A Value is required</span>
      </div>
    </div>
  );
}

export default Checkbox;
