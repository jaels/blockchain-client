import React from 'react';

type Props = {
  name: string;
  label: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<Props> = ({ name, label, onInputChange }) => {
  return (
    <label htmlFor={name}>
      <span className='label'>{label}</span>
      <input
        type={name === 'amount' ? 'number' : 'text'}
        name={name}
        onChange={onInputChange}
        required
      />
    </label>
  );
};

export default InputField;
