
import React from 'react';

import '../app/App.css';

import Notification from '../notification/Notification';
import TopBar from './topbar/TopBar';

class Home extends React.Component {

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        return (
            <div>
                <Notification type="error" message={this.props.message} dismiss={this.props.dismiss} />
                <TopBar />
                <div className="container-fluid" id="main-container">
                    <p className="mb-4">{this.props.address}</p>
                    <div className="row">
                        <div className="col-sm-1">

                        </div>
                        <div className="col">

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Home;