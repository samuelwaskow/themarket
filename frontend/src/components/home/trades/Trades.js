
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

                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>Price</div>
                        <div>Quantity</div>
                    </li>
                    {this.props.trades.map(t => {
                        return (
                            <li key={t.creationTime} class="list-group-item d-flex justify-content-between align-items-center">
                                <div>{parseInt(t.price)}</div>
                                <div>{parseInt(t.quantity)}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

}

export default Trades;