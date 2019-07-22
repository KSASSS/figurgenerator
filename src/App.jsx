import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Sidebar imports */
import Sidebar from './components/Sidebar/Sidebar.jsx'

/* Figurområde imports */
import FigureGrid from './components/FigureGrid/FigureGrid.jsx'

import { regionInfo } from 'constants'

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
        this.createFigureBox = this.createFigureBox.bind(this);
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
            });
        } else {
            var actTmp = this.state.activeFilters;
            actTmp[groupName].push(filterName);

            this.setState({
                activeFilters: actTmp
            })
        }
    }

    createFigureBox() {
        if (Object.keys(this.state.activeFilters).length !== 3) {
            alert('Mangler verdi på en eller flere filtergrupper');
            return;
        }
        console.log('Button got clicked, activefilters are: ');
        console.log(this.state.activeFilters);
        this.figureGridElement.current.addFigureBox(this.state.activeFilters);
    }

    /** When a filter gets unchecked, it gets removed here */
    removeActiveFilters(groupName, filterName, checked) {
        console.log('Removing active filter ' + filterName + ' from App');
        var filterGroup = this.state.activeFilters[groupName];

        console.log('Before');
        console.log(filterGroup);

        if (groupName === 'Region') {
            var regionCode = regionInfo.find(r => r.name === filterName).code;
            console.log(regionCode + ' rc');
            filterGroup = filterGroup.filter(filterItem => filterItem !== regionCode);
            console.log('After');
            console.log(filterGroup);
        } else {
            filterGroup = filterGroup.filter(filterItem => filterItem !== filterName);
        }
        

        // Was the last filter in the group, removing the group
        if (filterGroup.length === 0) {
            var actTmp = this.state.activeFilters;
            delete actTmp[groupName];

            this.setState({
                activeFilters: actTmp
            })
        } else {
            var actTmp = this.state.activeFilters;
            actTmp[groupName] = filterGroup;

            this.setState({
                activeFilters: actTmp
            })
        }
    }

    render() {
        return(
            <Grid className='mainpage' container spacing={0}>
                <Sidebar addActiveFilters={this.addActiveFilters} removeActiveFilters={this.removeActiveFilters} createFigureBox={this.createFigureBox}/>
                <FigureGrid ref={this.figureGridElement}/>
            </Grid>
        );
    }
}