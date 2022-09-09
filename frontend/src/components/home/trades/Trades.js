
import React from 'react';

class Trades extends React.Component {

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        return (
            <div>
                <h1>Trades</h1>
                <h5>{this.props.title}</h5>
            </div>
        );
    }

}

export default Trades;