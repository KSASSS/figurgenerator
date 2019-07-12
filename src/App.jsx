import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Sidebar imports */
import Sidebar from './components/Sidebar/Sidebar.jsx'

/* Figurområde imports */
import FigureGrid from './components/FigureGrid/FigureGrid.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Grid className='mainpage' container spacing={0}>
                <Sidebar />
                <FigureGrid />
            </Grid>
        );
    }
}