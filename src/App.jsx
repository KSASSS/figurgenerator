import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";
import Drawer from '@material-ui/core/Drawer';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import { withStyles } from '@material-ui/styles';

/* Sidebar imports */
import Sidebar from './components/Sidebar/Sidebar.jsx'

/* Figurområde imports */
import FigureGrid from './components/FigureGrid/FigureGrid.jsx'

import { regionInfo, drawerWidth } from 'constants'

//const drawerWidth = 240;

const styles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      //backgroundColor: theme.palette.background.default,
      //padding: theme.spacing(3),
    },
  });

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            figureGrid: {},
            sideBar: {},
            activeFilters: [],
            disabled: false,
            disabledGroupName: '',
            uniqueFilterName: '',
        }

        this.figureGridElement = React.createRef();
        this.addActiveFilters = this.addActiveFilters.bind(this);
        this.removeActiveFilters = this.removeActiveFilters.bind(this);
        this.createFigureBox = this.createFigureBox.bind(this);

        this.sidebarRef = React.createRef();
    }

    addActiveFilters(groupName, filterName, checked) {
        const { activeFilters } = this.state;

        console.log('Adding active filters to App');
        var filterGroup = activeFilters[groupName];
        var filterCount = 0;
        var disabled = this.state.disabled;
        var disabledGroupName = this.state.disabledGroupName;
        var uniqueFilterName = this.state.uniqueFilterName;

        var actTmp = activeFilters;

        if (filterGroup === undefined) {
            console.log('Filtergroup does not exist, creating it');

            actTmp[groupName] = [filterName];

            if (Object.keys(actTmp).length === 3) {
                Object.keys(actTmp).map(item => {
                    if (actTmp[item].length >= 2) {
                        filterCount++;
                    }
                })
    
                if (filterCount === 2) {
                    this.sidebarRef.current.disableCheckboxes(groupName, filterName);
                    disabled = true;
                    disabledGroupName = groupName;
                    uniqueFilterName = filterName;
                }
            }

            this.setState({
                activeFilters: actTmp,
                disabled: disabled,
                disabledGroupName: disabledGroupName,
                uniqueFilterName: uniqueFilterName
            });
        } else {
            actTmp[groupName].push(filterName);

            // Count filtergroups with 2 or more checked filters and also find the unique filter
            if (Object.keys(actTmp).length === 3) {
                Object.keys(actTmp).map(item => {
                    if (actTmp[item].length >= 2) {
                        filterCount++;
                    } else {
                        disabledGroupName = item;
                        uniqueFilterName = actTmp[item][0];
                    }
                })

                // Two filtergroups have two or more checked filters, disable unchecked ones in the 
                // filtergroup with only one checked
                if (filterCount === 2 && !disabled) {
                    this.sidebarRef.current.disableCheckboxes(disabledGroupName, uniqueFilterName);
                    disabled = true;
                }
            }

            this.setState({
                activeFilters: actTmp,
                disabled: disabled,
                disabledGroupName: disabledGroupName,
                uniqueFilterName: uniqueFilterName
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
        var disabled = this.state.disabled;

        if (groupName === 'Region') {
            var regionCode = regionInfo.find(r => r.name === filterName).code;
            filterGroup = filterGroup.filter(filterItem => filterItem !== regionCode);
        } else {
            filterGroup = filterGroup.filter(filterItem => filterItem !== filterName);
        }
        

        // Was the last filter in the group, removing the group
        if (filterGroup.length === 0) {
            var actTmp = this.state.activeFilters;
            delete actTmp[groupName];

            // If it was the last filter in the group and disabled is true, then this is the disabled group
            if (disabled) {
                this.sidebarRef.current.removeDisabling(this.state.disabledGroupName);
                disabled = !disabled;
            }
                
            
            this.setState({
                activeFilters: actTmp,
                disabled: disabled
            })
        } else {
            var actTmp = this.state.activeFilters;
            var filterCount = 0;

            actTmp[groupName] = filterGroup;

            if (Object.keys(actTmp).length === 3) {
                Object.keys(actTmp).map(item => {
                    if (actTmp[item].length >= 2) {
                        filterCount++;
                    }
                })

                if (filterCount !== 2) {
                    this.sidebarRef.current.removeDisabling(this.state.disabledGroupName);
                    disabled = false;
                }
            }
            /**
             * Ta vekk disabled hvis det nå er < 2 grupper med >= 2 checkboxer
             */

            this.setState({
                activeFilters: actTmp,
                disabled: disabled
            })
        }
    }

    render() {
        const { classes } = this.props;

        return(
            <div>
            <Box className={classes.root} m={0}>
                <Sidebar addActiveFilters={this.addActiveFilters} removeActiveFilters={this.removeActiveFilters} createFigureBox={this.createFigureBox} ref={this.sidebarRef}/>
                <FigureGrid className={classes.content} ref={this.figureGridElement}/>
            </Box>
            </div>
        );
    }
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(App)