
import './App.css';
import React from 'react';

import NoWalletDetected from '../nowalletdetected/NoWalletDetected';
import ConnectWallet from '../connectwallet/ConnectWallet';
import Notification from '../notification/Notification';
import Loading from '../loading/Loading'

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

  /**
   * Renderer function
   * 
   * @returns Code to be displayed
   */
  render() {

    /**
     * Ethereum wallets inject the window.ethereum object. If it hasn't been
     * injected, we instruct the user to install MetaMask.
     */
    if (window.ethereum === undefined) {
      return <NoWalletDetected />;
    }

    /**
     * The next thing we need to do, is to ask the user to connect their wallet.
     * When the wallet gets connected, we are going to save the users's address
     * in the component's state. So, if it hasn't been saved yet, we have
     * to show the ConnectWallet component.
     * Note that we pass it a callback that is going to be called when the user
     * clicks a button. This callback just calls the _connectWallet method.
     */
    if (!this.state.selectedAddress) {
      return <ConnectWallet />;
    }

    /**
     * If the token data or the user's balance hasn't loaded yet, we show
     * a loading component.
     */
    if (!this.state.tokenData || !this.state.balance) {
      return <Loading />;
    }

  }
}

export default App;
