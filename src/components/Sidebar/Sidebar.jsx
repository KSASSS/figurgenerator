import React, {Component} from "react";

/* Constants */
import {indikatorURL, getMethod} from 'constants'

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

import ChosenFiltergroup from 'components/ChosenFilterbox/ChosenFiltergroup'

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
    }

    componentDidMount() {
        this.setState({chosenFilters: <ChosenFiltergroup key='vfiltergrp' title='Valgte Filter'/>})

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

    filterGotChosen(groupName, filterName) {
        var chosenFilter = [<ChosenFiltergroup key='vfiltergrp' title='Valgte Filter' groups={groupName}/>];
        this.setState({chosenFilters: chosenFilter})
    }

    render() {
      return (
        <div>
            {this.state.chosenFilters}
            {this.state.filterDropdowns}
        </div>
      )
    }
}