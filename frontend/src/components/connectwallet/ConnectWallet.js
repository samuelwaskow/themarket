
import React from 'react';

import logo from '../../logo.svg';
import '../app/App.css';

class ConnectWallet extends React.Component {

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="display-1 mb-4">The Market</h1>
                    <button type="button" className="btn btn-primary">Connect Your Wallet</button>
                </header>
            </div>
        );
    }

}

export default ConnectWallet;