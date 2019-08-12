import React, {Component} from "react";

/* Constants */
import { indikatorURL, getMethod, regionInfo, validYears } from 'constants'
import { Plus, Minus } from 'mdi-material-ui'

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";

import TextField from '@material-ui/core/TextField';

import Box from '@material-ui/core/Box';

import { withStyles } from '@material-ui/styles';

import { drawerWidth } from 'constants'

import Drawer from '@material-ui/core/Drawer';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        height: 'calc(100% - 64px)',
        top: 96,
    },
    addFigureButton: {
        position: 'fixed',
        height: 32,
        padding: '0px'
    },
    content: {
      flexGrow: 1,
    },
    searchfield: {
        width: drawerWidth - 8,
        top: 42,
        position: 'fixed',
    }
});
class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            indikatorer: [],
            chosenFilters: [],
            filterDropdowns: [],
            references: [],
        }

        this.filterGotChosen = this.filterGotChosen.bind(this);
        this.filterGotRemoved = this.filterGotRemoved.bind(this);
        this.handleInput = this.handleInput.bind(this);

        //this.chosenFilterboxElement = React.createRef();
    }

    componentDidMount() {
        //this.createRef("vfilter");
        //this.setState({chosenFilters: <ChosenFilterbox ref={this.getRef('vfilter')} key='vfiltergrp' title='Valgte Filter' unMountChosenFilterbox={this.unMountChosenFilterbox} updateSidebar={this.filterGotRemoved}/>})

        fetch(`${indikatorURL}`, getMethod)
        .then(response => response.json())
        .then(result => {
            /*var result = result.map(indikator => {
                return indikator.charAt(0).toUpperCase() + indikator.slice(1);
            })*/

            this.setState({
                indikatorer: result.sort()
            });
            
            var tmpArr = [];
            
            var regions = regionInfo.map(item => {
                return item.name;
            })

            this.createRef("Region");
            tmpArr.push(<FilterDropdown key='region' ref={this.getRef('Region')} updateSidebar={this.filterGotChosen} title='Region' values={regions}/>);

            this.createRef("År");
            tmpArr.push(<FilterDropdown key='år' ref={this.getRef('År')} updateSidebar={this.filterGotChosen} title='År' values={validYears}/>);

            this.createRef("Indikator");
            tmpArr.push(<FilterDropdown key='indikator' ref={this.getRef('Indikator')} updateSidebar={this.filterGotChosen} title='Indikator' values={this.state.indikatorer}/>);

            this.setState({filterDropdowns: tmpArr})
        })
   
    }

    getRef(id) {
        return this.state.references[id];
    }

    createRef(id) {
        var tmpRef = this.state.references;
        tmpRef[id] = React.createRef();
        this.setState({references: tmpRef});
    }

    filterGotChosen(groupName, filterName, checked) {
        if (checked) {
            console.log('Filter ' + filterName + ' in group ' + groupName + ' got checked');
            
            if (groupName === 'Region') {
                var regionInfoObj = regionInfo.find(r => r.name === filterName);

                this.props.addActiveFilters(groupName, regionInfoObj.code, checked);
            } else {
                this.props.addActiveFilters(groupName, filterName, checked);
            }
            
        } else {
            console.log('Filter ' + filterName + ' in group ' + groupName + ' got unchecked');
            this.props.removeActiveFilters(groupName, filterName, checked);
        }
    }

    filterGotRemoved(filterGroupName, filterName) {
        console.log('filterGotRemoved')
        this.state.references[filterGroupName].current.updateCheckbox(filterName);
        this.props.removeActiveFilters(groupName, filterName, checked);
    }

    handleInput() {
        Object.keys(this.state.references).map(fdd => {
            this.state.references[fdd].current.searchForFilter(event.target.value);
        })
    }

    disableCheckboxes(groupName, checkboxName) {
        const { references } = this.state;

        references[groupName].current.disableAllButOne(groupName, checkboxName);
    }

    removeDisabling(groupName) {
        const { references } = this.state;

        references[groupName].current.removeDisabling();
    }

    render() {
        const { classes } = this.props;
        return (
                <Box className={classes.root}>
                    <Button 
                        className={classes.addFigureButton} 
                        onClick={this.props.createFigureBox}
                        p={0}
                    >
                        <Plus className='button'/>Generer figur
                    </Button>
                    <TextField 
                        className={classes.searchfield} 
                        type='text' 
                        placeholder='Søk etter filter' 
                        onChange={this.handleInput}
                    />
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        {this.state.filterDropdowns}
                    </Drawer>
            </Box>
        )
    }
}

export default withStyles(styles)(Sidebar)