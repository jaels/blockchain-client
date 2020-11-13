import React, { useState } from 'react';
import InputField from './InputField';
import { registerTransaction } from './api';

type Inputs = {
  mnemonic: string;
  senderAddress: string;
  recipientAddress: string;
  amount: string;
};

const TransactionForm: React.FC<{}> = () => {
  const [inputs, updateInputs] = useState<Inputs>({
    mnemonic: '',
    senderAddress: '',
    recipientAddress: '',
    amount: '',
  });
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onInputChange = (e: { target: HTMLInputElement }): void => {
    const { name, value } = e.target;
    updateInputs({ ...inputs, [name]: value });
  };

  const onRegisterTransaction = async (
    e: React.SyntheticEvent<EventTarget>
  ) => {
    e.preventDefault();
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
    <div className='registerTransactionWrapper'>
      <form className='formWrapper' onSubmit={onRegisterTransaction}>
        <fieldset>
          <legend>Make a Transaction</legend>
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
            label='Amount'
            onInputChange={onInputChange}
          />
          <button type='submit'>Submit</button>
        </fieldset>
      </form>
      {transactionId && <div>Transaction ID: {transactionId}</div>}
      {error && <div>The following error occured: {error}</div>}
    </div>
  );
};

export default TransactionForm;
