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
            activeFilters: [],
        }

        this.figureGridElement = React.createRef();
        this.addActiveFilters = this.addActiveFilters.bind(this);
        this.removeActiveFilters = this.removeActiveFilters.bind(this);
    }

    addActiveFilters(groupName, filterName, checked) {
        console.log('Adding active filters to App');
        var filterGroup = this.state.activeFilters[groupName];

        if (filterGroup === undefined) {
            console.log('Filtergroup does not exist, creating it');
            var actTmp = this.state.activeFilters;
            actTmp[groupName] = [filterName];

            this.setState({
                activeFilters: actTmp
            }, () => {
                if (Object.keys(this.state.activeFilters).length === 3) {
                    console.log('Three groups selected, adding a figurebox');
                    this.figureGridElement.current.addFigureBox(this.state.activeFilters);
                }
            });
        } else {
            var actTmp = this.state.activeFilters;
            actTmp[groupName].push(filterName);

            this.setState({
                activeFilters: actTmp
            })
        }
    }

    /** When a filter gets unchecked, it gets removed here */
    removeActiveFilters(groupName, filterName, checked) {
        console.log('Removing active filters from App');
        var filterGroup = this.state.activeFilters[groupName];
        
        filterGroup.pop(filterName);

        // Was the last filter in the group, removing the group
        if (filterGroup.length === 0) {
            var actTmp = this.state.activeFilters;
            delete actTmp[groupName];

            this.setState({
                activeFilters: actTmp
            })
        }
    }

    render() {
        return(
            <Grid className='mainpage' container spacing={0}>
                <Sidebar addActiveFilters={this.addActiveFilters} removeActiveFilters={this.removeActiveFilters}/>
                <FigureGrid ref={this.figureGridElement}/>
            </Grid>
        );
    }
}