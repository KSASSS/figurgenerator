import React, { Component } from 'react';

import Typography from "@material-ui/core/Typography";

/* Dropdown imports */
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ChosenFiltergroup from './ChosenFiltergroup';
import { callbackify } from 'util';

export default class ChosenFilterbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }
    }

    hasTitle(name) {

    }

    addFilter(groupName, filterName) {
        var groupsArr = this.state.groups;

        const exists = false;

        var itemsProcessed = 0;

        if (groupsArr.length === 0) {
            groupsArr.push(<ChosenFiltergroup key={groupName} title={groupName}/>);
            this.setState({groups: groupsArr});
            return;
        }

        
    }

    render() {
        return(
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                        <Typography>{this.props.title}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.state.groups}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}