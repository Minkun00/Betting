// Main.js
import React, { useState } from 'react';
import Login from './src/Login';

function Main({ contract, account }) {
  return (
    <React.Fragment>
      <Login
        contract={contract}
        account={account}
      />
    </React.Fragment>
  );
}

export default Main;

