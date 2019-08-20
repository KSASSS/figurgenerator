import React, { Component } from 'react';

import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';

import { withStyles } from '@material-ui/styles';

/* Sidebar imports */
import Sidebar from './components/Sidebar/Sidebar.jsx'

/* Figurområde imports */
import FigureGrid from './components/FigureGrid/FigureGrid.jsx'

import { regionInfo } from 'constants'

const styles = theme => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
    },
  });

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeFilters: {},
            disabled: false,
            disabledGroupName: '',
            figureGrid: {},
            sideBar: {},
            uniqueFilterName: '',
        }

        this.addActiveFilters = this.addActiveFilters.bind(this);
        this.createFigureBox = this.createFigureBox.bind(this);
        this.figureGridElement = React.createRef();
        this.removeActiveFilters = this.removeActiveFilters.bind(this);
        

        this.sidebarRef = React.createRef();
    }

    /**
     * Adds an active filter, a filter that is checked to the list of activefilters
     * 
     * If the group the filter is in isn't defined in activeFilters, creates the new one.
     * Also handles the disabling of checkboxes
     * 
     * @param groupName - the name of the filtergroup
     * @param filterName - the name of the filter, it's value
     */
    addActiveFilters(groupName, filterName) {
        const { activeFilters, disabledGroupName, uniqueFilterName } = this.state;

        console.log('Adding active filters to App');
        var filterGroup = activeFilters[groupName];
        var filterCount = 0;
        var disabled = this.state.disabled;

        // Variables used to avoid async problems with setState
        var disabledGroup = disabledGroupName;
        var uniqueFilter = uniqueFilterName;

        var actTmp = activeFilters;

        if (filterGroup === undefined) {
            console.log('Filtergroup does not exist, creating it');

            actTmp[groupName] = [filterName];

            // If there has been chosen one of each group, check if there is two with
            // 2 or more active filters
            if (Object.keys(actTmp).length === 3) {
                Object.keys(actTmp).map(item => {
                    if (actTmp[item].length >= 2) {
                        filterCount++;
                    }
                })
                
                // There is two groups which have two or more active filters, need to disable
                // the rest of the checkboxes in this group
                if (filterCount === 2) {
                    this.sidebarRef.current.disableCheckboxes(groupName, filterName);
                    disabled = true;
                    disabledGroup = groupName;
                    uniqueFilter = filterName;
                }
            }

            this.setState({
                activeFilters: actTmp,
                disabled: disabled,
                disabledGroupName: disabledGroup,
                uniqueFilterName: uniqueFilter
            });
        } else {
            // Filter is already added, should just stop
            // Occurs when alle button is pushed and the filter is already in the list
            if (actTmp[groupName].includes(filterName))
                return;

            actTmp[groupName].push(filterName);

            // Count filtergroups with 2 or more checked filters and also find the unique filter
            if (Object.keys(actTmp).length === 3) {
                Object.keys(actTmp).map(item => {
                    if (actTmp[item].length >= 2) {
                        filterCount++;
                    } else {
                        disabledGroup = item;
                        uniqueFilter = actTmp[item][0];
                    }
                })

                // Two filtergroups have two or more checked filters, disable unchecked ones in the 
                // filtergroup with only one checked
                if (filterCount === 2 && !disabled) {
                    this.sidebarRef.current.disableCheckboxes(disabledGroup, uniqueFilter);
                    disabled = true;
                }
            }

            this.setState({
                activeFilters: actTmp,
                disabled: disabled,
                disabledGroupName: disabledGroup,
                uniqueFilterName: uniqueFilter
            })
        }
    }

    /** Creates a new figurebox
     * 
     * Creates a new figurebox with the activefilters specified.
     * 
     */
    createFigureBox() {
        // There isn't enough active filters to query the API
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
        const { activeFilters, disabledGroupName } = this.state;

        var filterGroup = activeFilters[groupName];
        var disabled = this.state.disabled;
        
        // Remove the unchecked filter from the activeFilter
        // Kommune is a special case as the codes are used when querying the API
        if (groupName === 'Kommune') {
            var regionCode = regionInfo.find(r => r.name === filterName).code;
            filterGroup = filterGroup.filter(filterItem => filterItem !== regionCode);
        } else {
            filterGroup = filterGroup.filter(filterItem => filterItem !== filterName);
        }
        
        var actTmp = activeFilters;

        // Was the last filter in the group, removing the group from activeFilters
        if (filterGroup.length === 0) {
            //var actTmp = this.state.activeFilters;
            delete actTmp[groupName];

            // If it was the last filter in the group and disabled is true, then this is the disabled group
            if (disabled) {
                this.sidebarRef.current.removeDisabling(disabledGroupName);
                disabled = !disabled;
            }
                
            this.setState({
                activeFilters: actTmp,
                disabled: disabled
            })
        } else {
            actTmp[groupName] = filterGroup;

            var filterCount = 0;
            if (Object.keys(actTmp).length === 3) {
                Object.keys(actTmp).map(item => {
                    if (actTmp[item].length >= 2) {
                        filterCount++;
                    }
                })

                // if the removal of the filter causes it to be less than two groups
                // with two or more indicators, remove the disabling
                if (filterCount !== 2) {
                    this.sidebarRef.current.removeDisabling(this.state.disabledGroupName);
                    disabled = false;
                }
            }

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