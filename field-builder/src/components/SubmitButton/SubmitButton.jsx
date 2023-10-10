import React, { useState } from 'react';

function SubmitButton({ onClick, loading, children }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (onClick) {
      setIsLoading(true);
      await onClick(e); // Execute the provided onClick function

      // After the action is complete, set loading to false
      setIsLoading(false);
    }
  };

  return (
    <button type="button" onClick={handleClick} disabled={isLoading} className='btn-submit'>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default SubmitButton;
