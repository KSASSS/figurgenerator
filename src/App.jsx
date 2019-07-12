import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Sidebar imports */
import Sidebar from './components/Sidebar/Sidebar.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper>
                     <p>Tittel</p>
                    </Paper>  
                </Grid>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs>
                    <Paper>
                        <p>Figurområde</p>
                    </Paper>
                </Grid>
            </Grid>
        );
    }
}