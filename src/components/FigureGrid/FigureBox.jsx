import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

import Figure from './Figure.jsx'

export default class FigureBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid item xs={2}>
                <Figure title={this.props.title}/>
            </Grid>
        );
    }
}