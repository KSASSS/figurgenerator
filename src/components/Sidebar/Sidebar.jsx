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
        }

        this.filterGotChosen = this.filterGotChosen.bind(this);
        this.filterGotRemoved = this.filterGotRemoved.bind(this);

        this.chosenFilterboxElement = React.createRef();
    }

    componentDidMount() {
        this.setState({chosenFilters: <ChosenFilterbox ref={this.chosenFilterboxElement} key='vfiltergrp' title='Valgte Filter'/>})

        fetch(`${indikatorURL}`, getMethod)
        .then(response => response.json())
        .then(result => {
            this.setState({indikatorer: result.slice(0, 5)});
            var tmpArr = [];

            tmpArr.push(<FilterDropdown key='region' updateSidebar={this.filterGotChosen} title='Region' values={this.state.regions}/>);
            tmpArr.push(<FilterDropdown key='år' updateSidebar={this.filterGotChosen} title='År' values={this.state.år}/>);
            tmpArr.push(<FilterDropdown key='indikator' updateSidebar={this.filterGotChosen} title='Indikator' values={this.state.indikatorer}/>);

            this.setState({filterDropdowns: tmpArr})
        })
   
    }

    filterGotChosen(groupName, filterName, checked) {
        if (checked) {
            this.chosenFilterboxElement.current.addFilter(groupName, filterName);
        } else {
            this.chosenFilterboxElement.current.removeFilter(groupName, filterName);
        }
    }

    filterGotRemoved() {
        console.log('filterGotRemoved');
    }

    render() {
      return (
        <div className='navbar'>
            
                <Grid item xs>
                    {this.state.chosenFilters} 
                </Grid>
                <Grid item xs>
                    {this.state.filterDropdowns}
                </Grid>
            
        </div>
      )
    }
}