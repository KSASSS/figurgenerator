import React, { Component } from 'react';

import Typography from "@material-ui/core/Typography";

/* Dropdown imports */
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

export default class ChosenFiltergroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
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
                        <p>{this.props.groups}</p>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}