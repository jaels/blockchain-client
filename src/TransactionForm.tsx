import React, { useState } from 'react';
import { registerTransaction } from './api';

type Inputs = {
  mnemonic: string;
  senderAddress: string;
  recipientAddress: string;
  amount: number;
};

const TransactionForm: React.FC<{}> = () => {
  const [inputs, updateInputs] = useState<Inputs>({
    mnemonic: '',
    senderAddress: '',
    recipientAddress: '',
    amount: 0,
  });

  const onInputChange = (e: { target: HTMLInputElement }): void => {
    const { name, value } = e.target;
    updateInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const onRegisterTransaction = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    console.log('submit');
  };

  return (
    <form className='formWrapper' onSubmit={onRegisterTransaction}>
      <fieldset>
        <legend>Make a Transaction</legend>
        <label htmlFor='mnemonic'>
          <span className='label'>mnemonic</span>
          <input
            type='text'
            name='mnemonic'
            onChange={onInputChange}
            required
          />
        </label>
        <label htmlFor='senderAddress'>
          <span className='label'>Sender Address</span>
          <input
            type='text'
            name='senderAddress'
            onChange={onInputChange}
            required
          />
        </label>
        <label htmlFor='recipientAddress'>
          <span className='label'>Recipient Address</span>
          <input
            type='text'
            name='recipientAddress'
            onChange={onInputChange}
            required
          />
        </label>
        <label htmlFor='amount'>
          <span className='label'>Amount (in ucosm)</span>
          <input
            type='number'
            name='amount'
            onChange={onInputChange}
            required
          />
        </label>
        <button type='submit'>Submit</button>
      </fieldset>
    </form>
  );
};

export default TransactionForm;
