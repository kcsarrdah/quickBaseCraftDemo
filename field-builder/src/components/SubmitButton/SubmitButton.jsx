import React, { useState } from 'react';

function SubmitButton({ id, onClick, loading, children }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (onClick) {
      setIsLoading(true);

      // Simulate loading for 2 seconds (you can adjust the duration as needed)
      setTimeout(async () => {
        await onClick(e); // Execute the provided onClick function

        // After the action is complete, set loading to false
        setIsLoading(false);
      }, 200); // 2 seconds (2000 milliseconds)
    }
  };

  return (
    <button type="button" id={id} onClick={handleClick} disabled={isLoading} className='btn-submit'>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default SubmitButton;
