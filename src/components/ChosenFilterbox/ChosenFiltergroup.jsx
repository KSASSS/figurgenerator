import React, { Component } from 'react';

import Typography from "@material-ui/core/Typography";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';

/* Dropdown imports */
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ChosenFilterbutton from './ChosenFilterbutton';

export default class ChosenFiltergroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chosenFilters: []
        }

        this.removeFilterButton = this.removeFilterButton.bind(this);
    }

    componentDidMount() {
        this.addFilterButton(this.props.firstVal);
    }

    addFilterButton(filterValue) {
        var tmp = this.state.chosenFilters;

        tmp.push(<ChosenFilterbutton key={filterValue} title={filterValue} removeButton={this.removeFilterButton}/>);
        this.setState({chosenFilters: tmp});
    }

    removeFilterButton(buttonName) {
        var tmp = this.state.chosenFilters;

        var index = tmp.indexOf(tmp.find(fb => fb.key === buttonName));

        if (index !== -1) {
            tmp.splice(index, 1);
            this.setState({chosenFilters: tmp});
        }

        if (this.state.chosenFilters.length === 0)
            this.props.removeFilterGroup(this.props.title);
        //console.log(index);
        //console.log(buttonName + ' please stop pushing me!');
    }

    render() {
        return(
            <div className='chosenfiltergroup'>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>{this.props.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid item xs>
                            {this.state.chosenFilters}
                        </Grid>     
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}