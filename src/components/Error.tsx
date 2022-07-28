import React from 'react';

export const Error: React.FC = () => {
  return (
    <div className="error">
      <span>😕</span>
      <h1>Something went wrong...</h1>
      <p>Please try again or try again later</p>
    </div>
  );
};
