import React, {Component} from "react";

/* Constants */
import {indikatorURL, getMethod} from 'constants'

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

export default class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            menus: [],
            regions: ['Drammen', 'Fredrikstad', 'Oslo'],
            år: [2015, 2016, 2017],
            indikatorer: [],
            content: [],
        }
    }

    componentDidMount() {
        fetch(`${indikatorURL}`, getMethod)
        .then(response => response.json())
        .then(result => {
            this.setState({indikatorer: result.slice(0, 5)});
            var tmpArr = [];

            tmpArr.push(<FilterDropdown key='region' title='Region' values={this.state.regions}/>);
            tmpArr.push(<FilterDropdown key='år' title='År' values={this.state.år}/>);
            tmpArr.push(<FilterDropdown key='indikator' title='Indikator' values={this.state.indikatorer}/>);

            this.setState({content: tmpArr})
        })
   
    }

    render() {
      return (
        <div>
            {this.state.content}
        </div>
      )
    }
}