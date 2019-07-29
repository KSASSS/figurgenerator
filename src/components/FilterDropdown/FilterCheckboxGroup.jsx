import React, {Component} from "react";

/* Checkbox imports */
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from '@material-ui/core/Button';

import FilterCheckbox from 'components/FilterDropdown/FilterCheckbox.jsx';

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    root: {
      display: 'flex',
    },
    checkbox: {
        visibility: 'visible',
        color: 'blue',
    },
    hiddenCheckbox: {
        visibility: 'hidden',
        color: 'blue',
    },
    findMe: {

    }
  });

class FilterCheckboxGroup extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            alternatives: [],
            references: [],
        }

        this.handleClick = this.handleClick.bind(this);
        this.checkboxGotUpdated = this.checkboxGotUpdated.bind(this);
        this.updateAlternatives = this.updateAlternatives.bind(this);
        this.createAndReturnRef = this.createAndReturnRef.bind(this);
        this.checkAll = this.checkAll.bind(this);
    }


    /* On mount create the checkbox alternatives */
    componentDidMount() {
        const { classes } = this.props;
        const { testCheck } = this.state;
        const values = this.props.values;
        var alternativesArr = [
            <FilterCheckbox value={'Alle'} checkAll={this.checkAll} checkboxGotUpdated={this.checkboxGotUpdated} ref={this.createAndReturnRef('Alle')}/>
        ]
        
        values.map(item => {
            alternativesArr.push(
                <FilterCheckbox value={item} checkboxGotUpdated={this.checkboxGotUpdated} ref={this.createAndReturnRef(item)}/>
            )
            
        });

        this.setState({
            alternatives: alternativesArr
        });
        
    }


    checkboxGotUpdated(name, checked) {
        this.props.updateFilterDropdown(name, checked);
    }

    createAndReturnRef(id) {
        var tmpRef = this.state.references;
        tmpRef[id] = React.createRef();
        this.setState({references: tmpRef});

        return this.state.references[id];
    }

    changeCheckedState(checkboxName) {
        var checked = !this.state[checkboxName];
        //console.log(this.state);
        this.setState({
            [checkboxName]: !this.state[checkboxName]
        }, () => {
            //this.setState({alternatives: this.state.alternatives});
        });
    }

    updateAlternatives(input) {
        if (input === '') {
            this.setState({
                filtered: false
            });
            return;
        }
        
        var tmp = this.state.alternatives.filter(alts => {
            if (alts.props.value.toLowerCase().match(input) !== null) {
                //this.state.references[alts.props.value].checked = true;
                console.log(this.state.references[alts.props.value]);
            }

            return alts.props.value.toLowerCase().match(input) !== null
        })
        console.log(this.state.alternatives);
        
        this.setState({
            filtered: true,
            filteredAlternatives: tmp,
            Drammen: false
        });
        console.log(this.state);
    }

    checkAll(checked) {
        const { references } = this.state;
        console.log(checked);

        Object.keys(references).map(cb => {
            if (cb !== 'Alle') {
                this.props.updateFilterDropdown(cb, checked);
                references[cb].current.setChecked(checked);
            }
        });
    }

    handleClick() {
        const { references } = this.state;
        console.log(references);

        Object.keys(references).map(cb => {
            this.props.updateFilterDropdown(cb, true);
            references[cb].current.setAsChecked();
        })
    }

    render() {
        //const { alternatives, filtered, filteredAlternatives } = this.state;
        return (
            <FormGroup row={true}>
                {this.state.alternatives}
            </FormGroup>
        )
    }
}

export default withStyles(styles)(FilterCheckboxGroup)