import React, {Component} from "react";

/* Constants */
import { indikatorURL, getMethod, regionInfo, validYears } from 'constants'
import { Plus, Minus } from 'mdi-material-ui'

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";

import ChosenFilterbox from 'components/ChosenFilterbox/ChosenFilterbox'

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

export default class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
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

            if (!this.state.filterChosen) {
                this.setState({filterChosen: !this.state.filterChosen},
                    () => {
                        //this.state.references.vfilter.current.addFilter(groupName, filterName);
                    }
                );
            } else {
                //this.state.references.vfilter.current.addFilter(groupName, filterName);
            }
            
            if (groupName === 'Region') {
                var regionInfoObj = regionInfo.find(r => r.name === filterName);

                this.props.addActiveFilters(groupName, regionInfoObj.code, checked);
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
          <div>
            <Paper><Button onClick={this.props.createFigureBox}><Plus className='button' />Generer figur</Button></Paper>
            {this.state.filterDropdowns}
          </div>
          /*
        <React.Fragment>
            <Grid item xs>         
                <Paper><Button onClick={this.props.createFigureBox}><Plus className='button' />Legg til figur</Button></Paper>
            </Grid>
            <Grid item xs={8}>
                {this.state.filterDropdowns}
            </Grid>
        </React.Fragment>
        */

        /** Old code to show selected filters
         * <Grid item xs>
                {this.state.filterChosen ? this.state.chosenFilters : null}
            </Grid>
         */
      )
    }
}