import logo from '../../logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {

  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      tokenDate: null,
      selectedAddress: null,
      balance: null
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 class="display-1 mb-4">The Market</h1>
          <button type="button" class="btn btn-primary">Connect Your Wallet</button>
        </header>
      </div>
    );
  }
}

export default App;
