import React, { useState } from 'react';
import InputField from './InputField';
import Error from './Error';
import { findTransaction, TransactionDetails } from '../api';

const FindTransactionForm: React.FC<{}> = () => {
  const [input, updateInput] = useState<string>('');
  const [
    transactionDetails,
    setTransactionDetails,
  ] = useState<TransactionDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onInputChange = (e: { target: HTMLInputElement }) => {
    updateInput(e.target.value);
  };

  const onFindTransaction = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    setTransactionDetails(null);
    setError(null);
    const response = await findTransaction(input);
    if (!response.error) {
      setTransactionDetails(response.result);
    } else {
      setError(response.result);
    }
  };

  const convertToUserFriendlyTime = (time: string): string => {
    const date = new Date(time).toLocaleDateString('de-DE');
    return date;
  };

  return (
    <div className='formWrapper'>
      <form className='form' onSubmit={onFindTransaction}>
        <fieldset>
          <legend className='formTitle'>Find a Transaction</legend>
          <InputField
            name='transactionId'
            label='Transaction ID'
            onInputChange={onInputChange}
          />
          <button className='submitButton' type='submit'>
            Submit
          </button>
        </fieldset>
      </form>
      {transactionDetails && (
        <div className='detailsArea'>
          <p>
            <strong>Date: </strong>
            {convertToUserFriendlyTime(transactionDetails.time)}
          </p>
          <p>
            <strong>From:</strong> {transactionDetails.from_address}
          </p>
          <p>
            <strong>To:</strong> {transactionDetails.to_address}
          </p>
          <p>
            <strong>Amount:</strong> {transactionDetails.amount.amount}{' '}
            {transactionDetails.amount.denom}
          </p>
        </div>
      )}
      {error && <Error error={error} />}
    </div>
  );
};

export default FindTransactionForm;
