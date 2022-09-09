
import React from 'react';

class Assets extends React.Component {

    /**
     * Renderer function
     * 
     * @returns Code to be displayed
     */
    render() {
        return (
            <div>
                <h1>Assets</h1>
                <table className="table table-hover clickable">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Symbol</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.assets.map(a => {
                            return (
                                <tr key={a.id} onClick={() => this.props.sendItem(a.id)} >
                                    <th scope="row">{parseInt(a.id) + 1}</th>
                                    <td>{a.symbol}</td>
                                    <td>{a.description}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Assets;