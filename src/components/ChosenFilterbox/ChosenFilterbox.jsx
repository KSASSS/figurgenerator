import React, { Component } from 'react';

import Typography from "@material-ui/core/Typography";

/* Dropdown imports */
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ChosenFiltergroup from './ChosenFiltergroup';

export default class ChosenFilterbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: []
        }

        this.chosenFilterGroupElement = React.createRef();
        this.removeFilterGroup = this.removeFilterGroup.bind(this);
    }

    hasTitle(name) {

    }

    addFilter(groupName, filterName) {
        var groupsArr = this.state.groups;

        const findTest = groupsArr.find(g => g.key === groupName);

        if (findTest === undefined) {
            groupsArr.push(<ChosenFiltergroup key={groupName} title={groupName} firstVal={filterName} removeFilterGroup={this.removeFilterGroup} ref={this.chosenFilterGroupElement}/>);
            this.setState({groups: groupsArr});

        } else {
            this.chosenFilterGroupElement.current.addFilterButton(filterName);
        }
        
    }

    removeFilter(groupName, filterName) {
        this.chosenFilterGroupElement.current.removeFilterButton(filterName);

        console.log('gotta remove ' + filterName + ' from ' + groupName);
    }

    removeFilterGroup(filterGroupName) {
        var tmp = this.state.groups;

        var index = tmp.indexOf(tmp.find(fg => fg.key === filterGroupName));
        
        if (index !== -1) {
            tmp.splice(index, 1);
            this.setState({groups: tmp});
        }
    }

    render() {
        return(
            <div>
                <Typography>{this.props.title}</Typography>
                {this.state.groups.map((item) =>
                    item
                )}
            </div>
            /** vfilterboks som dropdown
            <div class='chosenfilterbox'>
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
            */
        );
    }
}