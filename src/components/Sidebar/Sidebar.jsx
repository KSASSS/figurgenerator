import React, {Component} from "react";

/* Constants */
import {indikatorURL, getMethod} from 'constants'

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

import ChosenFilterbox from 'components/ChosenFilterbox/ChosenFilterbox'

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

export default class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            regions: ['Drammen', 'Fredrikstad', 'Oslo'],
            år: [2015, 2016, 2017],
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

            

        } else {
            console.log('Filter ' + filterName + ' in group ' + groupName + ' got unchecked');
            if(this.state.references.vfilter.current.removeFilter(groupName, filterName))
                console.log('heu');

        }
    }

    filterGotRemoved(filterGroupName, filterName) {
        console.log('filterGotRemoved')
        this.state.references[filterGroupName].current.updateCheckbox(filterName);
    }

    resetAllFilters() {

    }

    unMountChosenFilterbox() {
        this.setState({filterChosen: false});
    }

    render() {
      return (
        <div className='navbar'>
            
                <Grid item xs>
                    {this.state.filterChosen ? this.state.chosenFilters : null}
                </Grid>
                <Grid item xs>
                    {this.state.filterDropdowns}
                </Grid>
            
        </div>
      )
    }
}