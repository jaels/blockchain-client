import React, { useState } from 'react';
import InputField from './InputField';
import Error from './Error';
import { registerTransaction } from '../api';

interface Inputs {
  mnemonic: string;
  senderAddress: string;
  recipientAddress: string;
  amount: string;
}

const TransactionForm: React.FC<{}> = () => {
  const initialInputState = {
    mnemonic: '',
    senderAddress: '',
    recipientAddress: '',
    amount: '',
  };
  const [inputs, updateInputs] = useState<Inputs>(initialInputState);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onInputChange = (e: { target: HTMLInputElement }) => {
    const { name, value } = e.target;
    updateInputs({ ...inputs, [name]: value });
  };

  const onRegisterTransaction = async (
    e: React.SyntheticEvent<EventTarget>
  ) => {
    e.preventDefault();
    setTransactionId(null);
    setError(null);
    const { mnemonic, senderAddress, recipientAddress, amount } = inputs;
    const response = await registerTransaction(
      mnemonic,
      senderAddress,
      recipientAddress,
      parseInt(amount)
    );
    if (!response.error) {
      setTransactionId(response.result);
    } else {
      setError(response.result);
    }
  };

  return (
    <div className='formWrapper'>
      <form className='form' onSubmit={onRegisterTransaction}>
        <fieldset>
          <legend className='formTitle'>Make a Transaction</legend>
          <InputField
            name='mnemonic'
            label='mnemonic'
            onInputChange={onInputChange}
          />
          <InputField
            name='senderAddress'
            label='Sender Address'
            onInputChange={onInputChange}
          />
          <InputField
            name='recipientAddress'
            label='Recipient Address'
            onInputChange={onInputChange}
          />
          <InputField
            name='amount'
            label='Amount 
            (in ucosm)'
            onInputChange={onInputChange}
          />
          <button className='submitButton' type='submit'>
            Submit
          </button>
        </fieldset>
      </form>
      {transactionId && (
        <div className='detailsArea'>
          <strong>Transaction ID:</strong> {transactionId}
        </div>
      )}
      {error && <Error error={error} />}
    </div>
  );
};

export default TransactionForm;
