import React, {Component} from "react";

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

export default class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            regions: ['Drammen', 'Fredrikstad', 'Oslo'],
            år: [2015, 2016, 2017],
            indikatorer: ['Ind 1', 'Ind 2']
        }
    }

    render() {
      return (
        <div>
            <FilterDropdown title='Region' values={this.state.regions}/>
            <FilterDropdown title='År'/>
            <FilterDropdown title='Indikator'/>
            <FilterDropdown title='Tjenesteprofil'/>
        </div>
      )
    }
}