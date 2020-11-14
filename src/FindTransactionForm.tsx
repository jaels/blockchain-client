import React, { useState } from 'react';
import InputField from './InputField';
import { findTransaction } from './api';

type TransactionDetails = {
  from_address: string;
  to_address: string;
  amount: { amount: string; denom: string };
};

const FindTransactionForm: React.FC<{}> = () => {
  const [input, updateInput] = useState<string>('');
  const [
    transactionDetails,
    setTransactionDetails,
  ] = useState<TransactionDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onInputChange = (e: { target: HTMLInputElement }): void => {
    updateInput(e.target.value);
  };

  const onRegisterTransaction = async (
    e: React.SyntheticEvent<EventTarget>
  ) => {
    e.preventDefault();
    const response = await findTransaction(input);
    console.log(response);
    if (!response.error) {
      setTransactionDetails(response.result);
    } else {
      setError(response.result);
    }
  };

  return (
    <div className='registerTransactionWrapper'>
      <form className='formWrapper' onSubmit={onRegisterTransaction}>
        <fieldset>
          <legend>Find a Transaction</legend>
          <InputField
            name='transactionId'
            label='Transaction ID'
            onInputChange={onInputChange}
          />

          <button type='submit'>Submit</button>
        </fieldset>
      </form>
      {transactionDetails && (
        <div className='detailsArea'>
          <p> From: {transactionDetails.from_address}</p>
          <p> To: {transactionDetails.to_address}</p>
          <p>
            {' '}
            Amount: {transactionDetails.amount.amount}{' '}
            {transactionDetails.amount.denom}
          </p>
        </div>
      )}
      {error && (
        <div className='error'>The following error occured: {error}</div>
      )}
    </div>
  );
};

export default FindTransactionForm;
