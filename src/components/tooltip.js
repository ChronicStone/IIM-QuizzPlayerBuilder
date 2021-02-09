import React from "react"
import "../scss/components/generic/tooltip-component.scss"

export default class Tooltip extends React.Component {
    constructor () {
        super();
        this.state = {
            isVisible: false,
        };
        this.timer = null;
    }

    componentWillUnmount () {
        clearTimeout(this.timer);
    }

    handleMouseEnter () {
        this.timer = setTimeout(() => {
            this.setState({
                isVisible: true
            });
        }, this.props.delayTime);
    }

    handleMouseLeave () {
        clearTimeout(this.timer);
        this.setState({
            isVisible: false
        });
    }

    render () {
        const isVisible = this.state.isVisible ? ' is-visible' : ' is-hidden';
        const className = `tooltip ${isVisible} ` ;

        return (
            <div 
                className={`tooltip ${this.state.isVisible ? ' is-visible' : ' is-hidden'} ${this.props.position ? 'tooltip--' + this.props.position : ''} ${this.props.color ? 'tooltip--' + this.props.color : ''}`}
                onMouseEnter={this.handleMouseEnter.bind(this)}
                onMouseLeave={this.handleMouseLeave.bind(this)}>
                    <span className="tooltip-label" style={{transform: `translate(-50%, ${this.props.offsetY ? this.props.offsetY : 0})`}}>{this.props.label}</span>
                    {this.props.children}
            </div>
        );
    }
}