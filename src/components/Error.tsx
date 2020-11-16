import React from 'react';

const Error: React.FC<{ error: string }> = ({ error }) => (
  <div className='error'>
    The following Error occured:<br></br> {error}
  </div>
);

export default Error;
