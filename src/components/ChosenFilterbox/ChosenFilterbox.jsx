import React, { Component } from 'react';

import './ChosenFilterbox.css'

import Typography from "@material-ui/core/Typography";

import ChosenFiltergroup from './ChosenFiltergroup';

export default class ChosenFilterbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            groups: [],
            references: {},
            groupHasFilters: {},
        }

        this.chosenFilterGroupElement = React.createRef();
        this.removeFilterGroup = this.removeFilterGroup.bind(this);
        this.updateSidebar = this.updateSidebar.bind(this);
        this.unmountFilterGroup = this.unmountFilterGroup.bind(this);
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
        console.log('Adding filter ' + filterName + ' to group ' + groupName);
        var groupsArr = this.state.groups;

        // Sjekker om gruppen allerede eksisterer i groups
        const findTest = groupsArr.find(g => g.key === groupName);
        if (findTest === undefined) {
            console.log(groupName + ' does not exists, adding the group to ChosenFilterbox');
            this.createRef(groupName);
            groupsArr.push(
                <ChosenFiltergroup key={groupName} 
                    title={groupName} 
                    updateSidebar={this.updateSidebar} 
                    firstVal={filterName} 
                    unmountFilterGroup={this.unmountFilterGroup} 
                    ref={this.getRef(groupName)}
                />
            );

            var hasFilterObj = this.state.groupHasFilters;
            hasFilterObj[groupName] = true;
            
            this.setState({groups: groupsArr, groupHasFilters: hasFilterObj});
            
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
        //console.log(this.state.groupHasFilters[groupName]);
        if (this.state.references[groupName].current.removeFilterButton(filterName))
            console.log('hei');
        //this.state.references[groupName].current.removeFilterButton(filterName);
    }

    removeFilterGroup(filterGroupName) {
        var tmp = this.state.groups;

        var index = tmp.indexOf(tmp.find(fg => fg.key === filterGroupName));
        
        if (index !== -1) {
            tmp.splice(index, 1);
            this.setState({groups: tmp});
        }
    }

    updateSidebar(filterGroupName, filterName) {
        this.props.updateSidebar(filterGroupName, filterName);
    }

    removeGroup(groupName) {
        this.setState({[groupHasFilters[groupName]]: !this.groupHasFilters[groupName]})
        return this.state.groups.length;
    }

    unmountFilterGroup(groupName) {
        console.log(groupName + ' has no more filters, unmounting it');
        
        var tmp = this.state.groups;
        var index = tmp.indexOf(tmp.find(fg => fg.key === groupName));
        
        if (index !== -1) {
            tmp.splice(index, 1);
        }

        var tmpObj = this.state.groupHasFilters;
        tmpObj[groupName] = false;

        this.setState({groupHasFilters: tmpObj, groups: tmp});

        if(tmp.length === 0)
            this.props.unMountChosenFilterbox();
    }

    render() {
        return(
            this.state.groups.map(item => (
                this.state.groupHasFilters[item.key] ? item : null
            ))
        );
    }
}