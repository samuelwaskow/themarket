
import './App.css';
import React from 'react';
import { ethers } from "ethers";

import NoWalletDetected from '../nowalletdetected/NoWalletDetected';
import ConnectWallet from '../connectwallet/ConnectWallet';
import Loading from '../loading/Loading'

import ExchangeArtifact from "../../contracts/Exchange.json";
import TokenArtifact from "../../contracts/Token.json";
import contractAddress from "../../contracts/contract-address.json";
import Home from '../home/Home';

/**
 * This is the Hardhat Network id that we set in our hardhat.config.js.
 * Here's a list of network ids https://docs.metamask.io/guide/ethereum-provider.html#properties
 * to use when deploying to other networks.
 */
const HARDHAT_NETWORK_ID = '31337';

// This is an error code that indicates that the user canceled a transaction
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

class App extends React.Component {

  /**
   * Constructor
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    /**
     * We store multiple things in Dapp's state.
     * - The info of the exchange
     * - The user's address and balance
     * - The ID about transactions being sent, and any possible error with them
     */
    this.initialState = {
      exchangeData: null,
      tokenData: null,
      selectedAddress: null,
      balance: null,
      assets: [],
      selectedAsset: null,
      orders: [],
      trades: [],
      txBeingSent: null,
      transactionError: null,
      networkError: null,
    };

    this.state = this.initialState;
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
    // console.log(`render - state [${JSON.stringify(this.state, undefined, 2)}]`);
    if (!this.state.selectedAddress) {
      return <ConnectWallet
        connectWallet={() => this._connectWallet()}
        message={this.state.networkError}
        dismiss={() => this._dismissNetworkError()}
      />;
    }

    /**
     * If the token data or the user's balance hasn't loaded yet, we show
     * a loading component.
     */
    if (!this.state.exchangeData || !this.state.balance) {
      return <Loading />;
    }

    return <Home
      title={this.state.exchangeData.name}
      assets={this.state.assets}
      orders={this.state.orders}
      trades={this.state.trades}
      selectAsset={this._selectAsset}
      placeOrder={this._placeAnOrder}
      logout={() => {
        this._stopPollingData();
        this._resetState();
      }} />
  }

  /**
   * We poll the user's balance, so we have to stop doing that when Dapp
   * gets unmounted
   */
  componentWillUnmount() {
    this._stopPollingData();
  }

  /**
   * This method is run when the user clicks the Connect. It connects the
   * dapp to the user's wallet, and initializes it.
   * To connect to the user's wallet, we have to run this method.
   * It returns a promise that will resolve to the user's address.
   * 
   * Once we have the address, we can initialize the application.
   * First we check the network
   * We reinitialize it whenever the user changes their account.
   * 
   * `accountsChanged` event can be triggered with an undefined newAddress.
   * This happens when the user removes the Dapp from the "Connected
   * list of sites allowed access to your addresses" (Metamask > Settings > Connections)
   * To avoid errors, we reset the dapp state 
   * 
   * We reset the dapp state if the network is changed
   * 
   * @returns 
   */
  async _connectWallet() {

    const [selectedAddress] = await window.ethereum.request({ method: 'eth_requestAccounts' });

    if (!this._checkNetwork()) {
      return;
    }

    this._initialize(selectedAddress);

    window.ethereum.on("accountsChanged", ([newAddress]) => {
      this._stopPollingData();
      if (newAddress === undefined) {
        return this._resetState();
      }

      this._initialize(newAddress);
    });

    window.ethereum.on("chainChanged", ([networkId]) => {
      this._stopPollingData();
      this._resetState();
    });
  }

  /**
   * This method initializes the dapp
   * 
   * We first store the user's address in the component's state
   * 
   * Then, we initialize ethers, fetch the token's data, and start polling
   * for the user's balance.
   * 
   * Fetching the token data and the user's balance are specific to this
   * sample project, but you can reuse the same initialization pattern.
   * 
   * @param {*} userAddress 
   */
  _initialize(userAddress) {

    this.setState({
      selectedAddress: userAddress,
    });

    this._initializeEthers();
    this._getExchangeData();
    this._getTokenData();
    this._startPollingData();
  }

  /**
   * We first initialize ethers by creating a provider using window.ethereum
   * 
   * Then, we initialize the contract using that provider and the token's
   * artifact. You can do this same thing with your contracts.
   */
  async _initializeEthers() {

    this._provider = new ethers.providers.Web3Provider(window.ethereum);

    this._exchange = new ethers.Contract(
      contractAddress.Exchange,
      ExchangeArtifact.abi,
      this._provider.getSigner()
    );
    this._token = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact.abi,
      this._provider.getSigner()
    );
  }


  /**
   * Start polling to update the user's balance
   */
  _startPollingData() {
    this._pollDataInterval = setInterval(() => this._updateExchange(), 1000);
  }

  /**
   * Stop polling to find the user's balance
   */
  _stopPollingData() {
    clearInterval(this._pollDataInterval);
    this._pollDataInterval = undefined;
  }

  /**
   * Store the contract results in the component state
   */
  async _getExchangeData() {
    const name = await this._exchange.name();

    this.setState({ exchangeData: { name } });
  }

  /**
   * Store the contract results in the component state
   */
  async _getTokenData() {
    const name = await this._token.name();
    const symbol = await this._token.symbol();

    this.setState({ tokenData: { name, symbol } });
  }

  /**
   * Store the balance in the component state
   */
  async _updateExchange() {
    const balance = await this._token.balanceOf(this.state.selectedAddress);
    this.setState({ balance });

    const assets = await this._exchange.listAssets();
    this.setState({ assets: assets });

    if (this.state.selectedAsset) {
      const orders = await this._exchange.listOrders(this.state.selectedAsset);
      this.setState({ orders: orders });

      // console.log(JSON.stringify(orders, undefined, 2));

      const trades = await this._exchange.listTrades(this.state.selectedAsset);
      this.setState({ trades: trades });
    }
    // console.log(JSON.stringify(this.state, undefined));
  }

  /**
   * Selects an asset
   * @param {*} asset 
   */
  _selectAsset = (asset) => {
    this.setState({ selectedAsset: asset });
  }

  /**
   * Places an order to the smart contract
   * @param {*} asset 
   */
  _placeAnOrder = (isBuy, price, quantity) => {
    console.log(`isBuy [${isBuy}] price [${price}] quantity [${quantity}]`);
  }

  /**
   * This method sends an ethereum transaction to transfer tokens.
   * While this action is specific to this application, it illustrates how to
   * send a transaction.
   * 
   * Sending a transaction is a complex operation:
   *   - The user can reject it
   *   - It can fail before reaching the ethereum network (i.e. if the user
   *     doesn't have ETH for paying for the tx's gas)
   *   - It has to be mined, so it isn't immediately confirmed.
   *     Note that some testing networks, like Hardhat Network, do mine
   *     transactions immediately, but your dapp should be prepared for
   *     other networks.
   *   - It can fail once mined.
   *
   * @param {*} to 
   * @param {*} amount 
   * @returns 
   */
  async _transferTokens(to, amount) {

    try {
      // If a transaction fails, we save that error in the component's state.
      // We only save one such error, so before sending a second transaction, we
      // clear it.
      this._dismissTransactionError();

      // We send the transaction, and save its hash in the Dapp's state. This
      // way we can indicate that we are waiting for it to be mined.
      const tx = await this._exchange.transfer(to, amount);
      this.setState({ txBeingSent: tx.hash });

      // We use .wait() to wait for the transaction to be mined. This method
      // returns the transaction's receipt.
      const receipt = await tx.wait();

      // The receipt, contains a status flag, which is 0 to indicate an error.
      if (receipt.status === 0) {
        // We can't know the exact error that made the transaction fail when it
        // was mined, so we throw this generic one.
        throw new Error("Transaction failed");
      }

      // If we got here, the transaction was successful, so you may want to
      // update your state. Here, we update the user's balance.
      await this._updateBalance();
    } catch (error) {
      // We check the error code to see if this error was produced because the
      // user rejected a tx. If that's the case, we do nothing.
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      // Other errors are logged and stored in the Dapp's state. This is used to
      // show them to the user, and for debugging.
      console.error(error);
      this.setState({ transactionError: error });
    } finally {
      // If we leave the try/catch, we aren't sending a tx anymore, so we clear
      // this part of the state.
      this.setState({ txBeingSent: undefined });
    }
  }

  /**
   * This method just clears part of the state.
   */
  _dismissTransactionError() {
    this.setState({ transactionError: null });
  }

  /**
   * This method just clears part of the state.
   */
  _dismissNetworkError() {
    this.setState({ networkError: null });
  }

  /**
   * This is an utility method that turns an RPC error into a human readable
   * message.
   * @param {*} error 
   * @returns 
   */
  _getRpcErrorMessage(error) {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  }

  /**
   * This method resets the state
   */
  _resetState() {
    this.setState(this.initialState);
  }

  /**
   * This method checks if Metamask selected network is Localhost:8545 
   * @returns 
   */
  _checkNetwork() {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    this.setState({
      networkError: 'Please connect Metamask to Localhost:8545'
    });
    console.error(`_checkNetwork - networkVersion [${window.ethereum.networkVersion}]`)
    return false;
  }
}

export default App;
