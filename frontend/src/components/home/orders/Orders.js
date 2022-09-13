
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

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orders.map(o => {
                            return (
                                <tr key={o.creationTime}>
                                    <td>{parseInt(o.price)}</td>
                                    <td>{parseInt(o.quantity)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Orders;