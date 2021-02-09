import React from "react"
import "../scss/components/generic/confirm-popup-component.scss"

export default class ConfirmPopup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                { !this.props.active ? '' : 
                    <div className="popupGlobalContainer">
                        <div className="popupBox">
                            <div className={`popupTitle ${this.props.color ? `title--${this.props.color}` : ''}`}>
                                {this.props.title}
                            </div>
                            <div className="popupMessage">
                                {this.props.message}
                            </div>
                            <div className="popupActions">
                                <div onClick={this.props.cancelAction}className="main-btn-component dark">CANCEL</div>
                                <div onClick={() => {this.props.acceptAction(this.props.actionProps)}} className={`main-btn-component ${this.props.color ? this.props.color : ''}`}>ACCEPT</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}