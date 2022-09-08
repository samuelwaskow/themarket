
import React from 'react';

class SideBar extends React.Component {

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        const normal = "list-group-item list-group-item-action";
        const active = "list-group-item list-group-item-action active";
        return (
            <section className="nav nav-sidebar">
                <div className="list-group">

                    <a href="/#" className={this.props.active === 'Assets' ? active : normal} aria-current={this.props.active === 'Assets'} onClick={() => this.props.sendItem('Assets')}>
                        Assets
                    </a>
                    <a href="/#" className={this.props.active === 'Orders' ? active : normal} aria-current={this.props.active === 'Orders'} onClick={() => this.props.sendItem('Orders')}>
                        Orders
                    </a>
                    <a href="/#" className={this.props.active === 'Trades' ? active : normal} aria-current={this.props.active === 'Trades'} onClick={() => this.props.sendItem('Trades')}>
                        Trades
                    </a>
                </div>
            </section>
        );
    }

}

export default SideBar;