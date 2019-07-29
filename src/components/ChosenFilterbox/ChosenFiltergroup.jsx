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
            chosenFilters: [],
            hasFilters: false,
        }

        this.removeFilterButton = this.removeFilterButton.bind(this);
    }

    componentDidMount() {
        this.addFilterButton(this.props.firstVal);
    }

    getSize() {

    }

    /** Legger til en filterknapp i gruppen
     * 
     * @param {*} filterValue - verdien man skal filtrere på
     */
    addFilterButton(filterValue) {
        console.log('Adding filterbutton ' + filterValue + ' to group ' + this.props.title);
        var tmp = this.state.chosenFilters;

        tmp.push(
            <ChosenFilterbutton key={filterValue} 
                title={filterValue} 
                removeButton={this.removeFilterButton}
            />
        );
        this.setState({chosenFilters: tmp});
    }

    /** Fjerner en filterknapp fra gruppen
     * 
     * Hvis gruppen ikke har flere filter kaller den på removeFilterGroup
     * 
     * @param {*} buttonName - filterverdien som skal fjernes
     */
    removeFilterButton(buttonName) {
        console.log('Removing filterbutton ' + buttonName + ' from group ' + this.props.title);
        // Filtrer vekk knappen som skal fjernes
        var tmp = this.state.chosenFilters.filter(button => button.key !== buttonName);

        this.setState({
            chosenFilters: tmp
        }, () => {
            if (this.state.chosenFilters.length === 0)
                this.props.unmountFilterGroup(this.props.title);
        });
    }

    render() {
        return(
            
                <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{this.props.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className='chosenfiltergroup'>
                        <Grid item xs>
                            {this.state.chosenFilters}
                        </Grid>     
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            
        );
    }
}