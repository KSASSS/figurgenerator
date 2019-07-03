import React, { Component } from 'react';

import Typography from "@material-ui/core/Typography";

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
                <Typography>{this.props.title}</Typography>
                <p>{this.props.groups}</p>
            </div>
        );
    }
}