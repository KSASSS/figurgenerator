import React, { Component } from 'react';

export default class ChosenFiltergroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }

    render() {
        return(
            <div>
                <p>{this.props.groups}</p>
            </div>
        );
    }
}