
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
            <nav className="navbar navbar-toggleable-md navbar-light bg-light">

                <img className="navbar-brand d-flex" src={logo} alt="Logo" />

                    <div className="mr-auto">
                        <div className="d-flex">
                            <small><b></b></small>
                        </div>
                        <div className="d-flex">
                            <small>Unidade: </small>
                        </div>
                    </div>

                    <div className="navbar-nav">
                    <button type="button" className="btn btn-link" onClick={this.props.logout}>Logout</button>
                </div>
            </nav>
        );
    }

}

export default TopBar;