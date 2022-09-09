
import React from 'react';

class Orders extends React.Component {

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        return (
            <div>
                <h1>Orders</h1>
                <h5>{this.props.title}</h5>
            </div>
        );
    }

}

export default Orders;