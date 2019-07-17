import React, {Component} from "react";

/* Constants */
import {indikatorURL, getMethod} from 'constants'
import { Plus, Minus } from 'mdi-material-ui'

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

import Button from '@material-ui/core/Button';

import ChosenFilterbox from 'components/ChosenFilterbox/ChosenFilterbox'

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

export default class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            regions: [
                'Bergen',
                'Bærum',
                'Drammen', 
                'Fredrikstad',
                'Kristiansand', 
                'Oslo',
                'Sandnes',
                'Stavanger',
                'Tromsø',
                'Trondheim',
            ],
            regionCodes: [
                '1201',
                '0219',
                '0602',
                '0106',
                '1001',
                '0301',
                '1102',
                '1103',
                '1902',
                '5001',
            ],
            år: ['2015', '2016', '2017'],
            indikatorer: [],
            chosenFilters: [],
            filterDropdowns: [],
            references: [],
            filterChosen: false,
        }

        this.filterGotChosen = this.filterGotChosen.bind(this);
        this.filterGotRemoved = this.filterGotRemoved.bind(this);
        this.unMountChosenFilterbox = this.unMountChosenFilterbox.bind(this);

        //this.chosenFilterboxElement = React.createRef();
    }

    componentDidMount() {
        this.createRef("vfilter");
        this.setState({chosenFilters: <ChosenFilterbox ref={this.getRef('vfilter')} key='vfiltergrp' title='Valgte Filter' unMountChosenFilterbox={this.unMountChosenFilterbox} updateSidebar={this.filterGotRemoved}/>})

        fetch(`${indikatorURL}`, getMethod)
        .then(response => response.json())
        .then(result => {
            this.setState({indikatorer: result.slice(0, 5)});
            var tmpArr = [];
            
            this.createRef("Region");
            tmpArr.push(<FilterDropdown key='region' ref={this.getRef('Region')} updateSidebar={this.filterGotChosen} title='Region' values={this.state.regions}/>);

            this.createRef("År");
            tmpArr.push(<FilterDropdown key='år' ref={this.getRef('År')} updateSidebar={this.filterGotChosen} title='År' values={this.state.år}/>);

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

            if (!this.state.filterChosen) {
                this.setState({filterChosen: !this.state.filterChosen},
                    () => {
                        this.state.references.vfilter.current.addFilter(groupName, filterName);
                    }
                );
            } else {
                this.state.references.vfilter.current.addFilter(groupName, filterName);
            }
            
            if (groupName === 'Region') {
                var idx = this.state.regions.indexOf(filterName);

                this.props.addActiveFilters(groupName, this.state.regionCodes[idx], checked);
            } else {
                this.props.addActiveFilters(groupName, filterName, checked);
            }
            
        } else {
            console.log('Filter ' + filterName + ' in group ' + groupName + ' got unchecked');
            this.props.removeActiveFilters(groupName, filterName, checked);
            if(this.state.references.vfilter.current.removeFilter(groupName, filterName))
                console.log('heu');

        }
    }

    filterGotRemoved(filterGroupName, filterName) {
        console.log('filterGotRemoved')
        this.state.references[filterGroupName].current.updateCheckbox(filterName);
        this.props.removeActiveFilters(groupName, filterName, checked);
    }

    resetAllFilters() {

    }

    unMountChosenFilterbox() {
        this.setState({filterChosen: false});
    }

    render() {
      return (
        <Grid className='sidebaritemwrapper' item xs={2}>
            <Grid container spacing={0} direction='column'>
            <Grid item xs>
                        <div>
                            <Button><Plus className='button' />Legg til figur</Button>
                        </div>
                    </Grid>
            <Grid item xs>
                {this.state.filterChosen ? this.state.chosenFilters : null}
            </Grid>
            <Grid item xs>
                {this.state.filterDropdowns}
            </Grid>
            </Grid>
        </Grid>
      )
    }
}