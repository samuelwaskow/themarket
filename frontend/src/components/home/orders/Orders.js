
import React from 'react';
import { Modal, Button } from "react-bootstrap";

class Orders extends React.Component {



    /**
     * Constructor
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.initialState = {
            showAddOrderModal: false,
            isBuy: true,
            price: 0,
            quantity: 0
        };

        this.state = this.initialState;
    }

    /**
     * Opens the modal to add a new order
     */
    addNewOrder = (v) => {
        this.setState({ showAddOrderModal: true });
    }

    /**
     * Cancels the order
     * @param {*} v 
     */
    cancelNewOrder = (v) => {
        this.setState(this.initialState);
    }

    /**
     * Send the order to the book
     * @param {*} v 
     */
    putNewOrder = () => {
        this.props.placeOrder(this.state.isBuy, this.state.price, this.state.quantity);
        this.setState(this.initialState);
    }

    /**
     * Sets the order price
     * @param {*} evt 
     */
    updatePrice(evt) {
        this.setState({ price: evt.target.value });
    }

    /**
     * Sets the order quantity
     * @param {*} evt 
     */
    updateQuantity(evt) {
        this.setState({ quantity: evt.target.value });
    }

    /**
     * Sets a buy order
     * @param {*} evt 
     */
    orderType(evt) {
        this.setState({ isBuy: evt.target.value === "true" });
    }

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        const isAssetSelected = this.props.title !== 'Select an asset';
        return (
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>Orders</h1>
                        <h5>{this.props.title}</h5>
                    </div>
                    { isAssetSelected &&
                        <button type="button"
                            className="btn btn-primary"
                            aria-label="Add"
                            onClick={this.addNewOrder}>
                            <span aria-hidden="true">+</span>
                        </button>
                    }
                </div>
                { isAssetSelected &&
                    <ul className="list-group">
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <div>Price</div>
                            <div>Quantity</div>
                        </li>
                        {this.props.orders.map(o => {
                            const typeStyle = o.isBuy ? "list-group-item d-flex justify-content-between align-items-center list-group-item-primary" : "list-group-item d-flex justify-content-between align-items-center list-group-item-danger";
                            return (
                                <li key={o.creationTime} className={typeStyle}>
                                    <div>{parseInt(o.price)}</div>
                                    <div>{parseInt(o.quantity)}</div>
                                </li>
                            );
                        })}
                    </ul>
                }
                <Modal show={this.state.showAddOrderModal} onHide={this.cancelNewOrder}>
                    <Modal.Header closeButton>
                        <Modal.Title>New Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="buyRadio" value="true" checked={this.state.isBuy === true} onChange={evt => this.orderType(evt)} />
                                <label className="form-check-label" htmlFor="buyRadio">Buy</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="sellRadio" value="false" checked={this.state.isBuy === false} onChange={evt => this.orderType(evt)} />
                                <label className="form-check-label" htmlFor="sellRadio">Sell</label>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="priceInput" className="form-label">Price</label>
                            <input type="number" className="form-control" value={this.state.price} onChange={evt => this.updatePrice(evt)} id="priceInput" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantityInput" className="form-label">Quantity</label>
                            <input type="number" className="form-control" value={this.state.quantity} onChange={evt => this.updateQuantity(evt)} id="quantityInput" />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.putNewOrder}>Send</Button>
                    </Modal.Footer>
                </Modal>
            </div>

        );
    }

}

export default Orders;