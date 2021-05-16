import React, { Component } from 'react'


export class Label extends Component {
    render() {
        return (
            // returns a customizable label
            <div>
                <label style={labelStyle}>{this.props.text}</label>
            </div>
        )
    }
}

// styling for the label
const labelStyle = {
    marginLeft: "0.8em",
    fontSize: "0.8em",
    fontFamily: "arial, sans-serif"
}

export default Label
