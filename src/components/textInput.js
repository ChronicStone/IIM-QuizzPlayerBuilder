import React from "react"
import "../scss/components/generic/text-input-component.scss"

export default class TextInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {"placeholder" : props.placeholder}
    }

    handleChange = () => {
        this.props.onChange(this.field.value);            
    }

    render() {
        return (
            <div>
               <input ref={(ref) => this.field = ref} 
                className={"text-input-component"}
                placeholder={this.state.placeholder}
                onChange={this.handleChange}
                required 
                />
            </div>
        )
    }
}