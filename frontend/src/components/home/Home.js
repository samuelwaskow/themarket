
import React from 'react';

import '../app/App.css';

import Notification from '../notification/Notification';
import Assets from './assets/Assets';
import Orders from './orders/Orders';
import SideBar from './sidebar/SideBar';
import TopBar from './topbar/TopBar';
import Trades from './trades/Trades';

class Home extends React.Component {

    /**
     * Constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 'Assets',
            pageSubtitle: 'Select an asset',
            selectedAsset: null
        };
    }

    /** 
     * Changes the current app screen
     * @param {*} val 
     */
    getItemClick = (val) => {
        this.setState({
            currentScreen: val
        });
    }

    /**
     * Selects the asset
     * @param {*} val 
     */
    getAsset = (val) => {
        this.setState({
            currentScreen: 'Orders',
            selectedAsset: this.props.assets[val],
            pageSubtitle: this.props.assets[val].description,
        }, () => {
            console.warn(JSON.stringify(this.state, undefined, 2));
        });

    }

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        let screen = <Assets assets={this.props.assets} sendItem={this.getAsset} />;
        if (this.state.currentScreen === 'Orders') {
            screen = <Orders title={this.state.pageSubtitle} />;
        } else if (this.state.currentScreen === 'Trades') {
            screen = <Trades title={this.state.pageSubtitle} />;
        }
        return (
            <div>
                <TopBar title={this.props.title} logout={this.props.logout} />
                <Notification type="error" message={this.props.message} dismiss={this.props.dismiss} />
                <div className="container-fluid" id="main-container">
                    <p className="mb-4">{this.props.exchange}</p>
                    <div className="row">
                        <div className="col-sm-1">
                            <SideBar active={this.state.currentScreen} sendItem={this.getItemClick} />
                        </div>
                        <div className="col">
                            {screen}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;