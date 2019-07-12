import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* FigurBox imports */
import FigureBox from './FigureBox.jsx'

export default class FigureGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: [],
        }
    }

    componentDidMount() {
        var tmp = [];
        var testArr = [
            'Box1',
            'Box2',
            'Box3'
        ]

        testArr.map(item => {
            tmp.push(<FigureBox title={item} />)
        })

        this.setState({test: tmp});
    }

    render() {
        return(
            <Grid item xs>
                <Grid container>
                {this.state.test.map(item => (
                    item
                ))}
                </Grid>
            </Grid>
        );
    }
}