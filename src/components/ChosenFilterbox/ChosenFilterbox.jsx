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
            groups: [],
            references: {},
        }

        this.chosenFilterGroupElement = React.createRef();
        this.removeFilterGroup = this.removeFilterGroup.bind(this);
    }

    getRef(id) {
        return this.state.references[id];
    }

    createRef(id) {
        var tmpRef = this.state.references;
        tmpRef[id] = React.createRef();
        this.setState({references: tmpRef});
    }

    /** Legger til et filter til boksen 
     * 
     * Hvis gruppen filteret tilhører ikke allerede finnes i Valgte Filter, lager den 
     * gruppen før den legger til filteret.
     * 
     * @param {string} groupName - navnet på gruppen til filteret
     * @param {string} filterName - navnet på filteret som skal legges til i valgte filter
     * 
    */
    addFilter(groupName, filterName) {
        var groupsArr = this.state.groups;

        // Sjekker om gruppen allerede eksisterer i groups
        const findTest = groupsArr.find(g => g.key === groupName);

        if (findTest === undefined) {
            this.createRef(groupName);
            groupsArr.push(<ChosenFiltergroup key={groupName} title={groupName} firstVal={filterName} removeFilterGroup={this.removeFilterGroup} ref={this.getRef(groupName)}/>);
            this.setState({groups: groupsArr});

        } else {
            this.state.references[groupName].current.addFilterButton(filterName);
        }
        
    }

    /** Fjerner et filter fra boksen
     * 
     * @param {string} groupName - navnet på gruppen til filteret som skal fjernes
     * @param {string} filterName - navnet på filteret som skal fjernes
     */
    removeFilter(groupName, filterName) {
        console.log(this.state.references[groupName]);
        this.state.references[groupName].current.removeFilterButton(filterName);
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