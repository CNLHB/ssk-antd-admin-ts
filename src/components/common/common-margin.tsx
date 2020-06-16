import React, { Component } from "react";


export default class CommonMargin extends Component<{}, {}> {
    render() {
        return (
            <div style={{ "margin": "24px" }}>{this.props.children}</div>

        )
    };
}
