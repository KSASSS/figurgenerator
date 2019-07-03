import React, {Component} from "react";

/* Constants */
import {indList, getMethod} from 'constants'

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
        fetch(`${indList}`, getMethod)
        .then(response => response.json())
        .then(result => {
            this.setState({indikatorer: result});
            console.log(this);
            var tmpArr = [];

        tmpArr.push(<FilterDropdown title='Region' values={this.state.regions}/>);
        tmpArr.push(<FilterDropdown title='År' values={this.state.år}/>);
        tmpArr.push(<FilterDropdown title='Indikator' values={this.state.indikatorer}/>);

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