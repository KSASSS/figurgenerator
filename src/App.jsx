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

        this.state = {
            figureGrid: {},
            sideBar: {},
            activeFilters: []
        }

        this.figureGridElement = React.createRef();
        this.updateActiveFilters = this.updateActiveFilters.bind(this);
    }

    updateActiveFilters(groupName, filterName, checked) {
        var filterGroup = this.state.activeFilters[groupName];

        if (filterGroup === undefined) {
            var actTmp = this.state.activeFilters;
            actTmp[groupName] = [filterName];

            this.setState({
                activeFilters: actTmp
            }, () => {
                console.log(this.state.activeFilters);
            });
        } else {
            filterGroup.push(filterName);
            var actTmp = this.state.activeFilters;
            actTmp[groupName] = tmp;

            this.setState({
                activeFilters: actTmp
            })
        }
    }

    render() {
        return(
            <Grid className='mainpage' container spacing={0}>
                <Sidebar updateActiveFilters={this.updateActiveFilters}/>
                <FigureGrid />
            </Grid>
        );
    }
}