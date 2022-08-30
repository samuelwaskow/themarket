
import React from 'react';

import '../app/App.css';

import Notification from '../notification/Notification';

class Home extends React.Component {

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Notification type="error" message={this.props.message} dismiss={this.props.dismiss} />
                    <h1 className="display-1 mb-4">The Market</h1>
                    <p className="mb-4">{this.props.address}</p>
                </header>
            </div>
        );
    }

}

export default Home;