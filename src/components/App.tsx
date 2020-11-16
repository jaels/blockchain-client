import React from 'react';
import MakeTransactionForm from './MakeTransactionForm';
import FindTransactionForm from './FindTransactionForm';

import '../App.css';

const App: React.FC<{}> = () => {
  return (
    <div className='App'>
      <MakeTransactionForm />
      <FindTransactionForm />
    </div>
  );
};

export default App;
