import React, {Component} from "react";

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

export default class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
      return (
        <div>
            <FilterDropdown tittel='Region'/>
            <FilterDropdown tittel='År'/>
            <FilterDropdown tittel='Indikator'/>
            <FilterDropdown tittel='Tjenesteprofil'/>
        </div>
      )
    }
}