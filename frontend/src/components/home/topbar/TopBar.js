
import React from 'react';

import logo from '../../../logo.svg';

class TopBar extends React.Component {

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <img className="navbar-brand d-flex" style={{ height: 55, width: 55 }} src={logo} alt="Logo" />

                    <div className="mr-auto">
                        <div className="d-flex">
                            <b>{this.props.title}</b>
                        </div>
                    </div>

                    <div className="navbar-nav">
                        <button type="button" className="btn btn-light" onClick={this.props.logout}>Logout</button>
                    </div>
                </div>
            </nav >
        );
    }

}

export default TopBar;