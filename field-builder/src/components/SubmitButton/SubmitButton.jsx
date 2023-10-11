import React, { useState } from 'react';

function SubmitButton({ id, onClick, loading, children, className }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (e) => {
    if (onClick) {
      setIsLoading(true);

      // Simulate loading for 2 seconds (you can adjust the duration as needed)
      setTimeout(async () => {
        await onClick(e); // Execute the provided onClick function

        // After the action is complete, set loading to false
        setIsLoading(false);
      }, 200); // 200 milliseconds (0.2 seconds)
    }
  };

  return (
    <button 
      type="button" 
      id={id} 
      onClick={handleClick} 
      disabled={isLoading} 
      className={`${className} btn-submit ${isLoading ? 'disabled' : ''}`} 
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default SubmitButton;
