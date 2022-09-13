
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

                <ul class="list-group">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <div>Price</div>
                        <div>Quantity</div>
                    </li>
                    {this.props.orders.map(o => {
                        const typeStyle = o.isBuy ? "list-group-item d-flex justify-content-between align-items-center list-group-item-primary" : "list-group-item d-flex justify-content-between align-items-center list-group-item-danger";
                        return (
                            <li key={o.creationTime} class={typeStyle}>
                                <div>{parseInt(o.price)}</div>
                                <div>{parseInt(o.quantity)}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

}

export default Orders;