import React from "react";

class Notification extends React.Component {

    /**
     * Renderer function
     * 
     * @returns 
     */
    render() {

        if (!this.props.message) {
            return (<div></div>)
        } else {

            let className = "alert alert-danger d-flex justify-content-between"
            let buttonClassName = "btn btn-danger btn-sm"

            if (this.props.type === "success") {
                className = "alert alert-success d-flex justify-content-between"
                buttonClassName = "btn btn-success btn-sm"
            }

            return (
                <div className={className} role="alert">
                    <div>{this.props.message}</div>
                    <button
                        type="button"
                        className={buttonClassName}
                        data-dismiss="alert"
                        aria-label="Close"
                        onClick={this.props.dismiss}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            );
        }
    }
}


export default Notification;