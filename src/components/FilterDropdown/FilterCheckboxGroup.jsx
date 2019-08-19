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

import { regionInfo } from 'constants'

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 200
    },
    checkbox: {
        fontSize: 8, 
    },
  });

class FilterCheckboxGroup extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            filtered: false,
            alternatives: [],
            filteredReferences: [],
            references: [],
            checkedAlternatives: [],
            filteredAlternatives: [],
        }

        this.checkboxGotUpdated = this.checkboxGotUpdated.bind(this);
        this.searchForFilter = this.searchForFilter.bind(this);
        //this.updateAlternatives = this.updateAlternatives.bind(this);
        this.createAndReturnRef = this.createAndReturnRef.bind(this);
        this.checkAll = this.checkAll.bind(this);
    }


    /* On mount create the checkbox alternatives */
    componentDidMount() {
        const { classes, values } = this.props;
        var alternativesArr = [
            <FilterCheckbox
                className={classes.allCheckbox}
                key={this.props.groupTitle + 'Merk/fjern alle'}
                value={'Merk/fjern alle'} 
                defaultCheckValue={false} 
                checkAll={this.checkAll} 
                checkboxGotUpdated={this.checkboxGotUpdated} 
                ref={this.createAndReturnRef('Merk/fjern alle', false)}
            />
        ]
        
        values.map(item => {
            alternativesArr.push(
                <FilterCheckbox
                    key={this.props.groupTitle + item}
                    value={item} 
                    defaultCheckValue={false} 
                    checkboxGotUpdated={this.checkboxGotUpdated} 
                    ref={this.createAndReturnRef(item, false)}
                />
            )
            this.setState({
                [item]: false
            })
        });

        this.setState({
            Alle: false,
            alternatives: alternativesArr
        });
        
    }


    checkboxGotUpdated(name, checked) {
        const { checkedAlternatives } = this.state;

        this.props.updateFilterDropdown(name, checked);

        var checkedTmp = checkedAlternatives;
        checkedTmp[name] = checked;

        this.setState({
            checkedAlternatives: checkedTmp
        })
    }

    createAndReturnRef(id, filtered) {
        const { references, filteredReferences} = this.state;
        var tmpRef;

        if (filtered) {
            tmpRef = filteredReferences;
            tmpRef[id] = React.createRef();
            this.setState({
                filteredReferences: tmpRef
            });

            return filteredReferences[id];
        } else {
            tmpRef = references;
            tmpRef[id] = React.createRef();
            this.setState({
                references: tmpRef
            });

            return this.state.references[id];
        }
    }

    checkAll(checked) {
        console.log('Changed checked value of all to ' + checked);
        const { checkedAlternatives, references } = this.state;

        Object.keys(references).map(cb => {
            if (cb !== 'Merk/fjern alle') {
                this.props.updateFilterDropdown(cb, checked);
                references[cb].current.setChecked(checked);

                var checkedTmp = checkedAlternatives;
                checkedTmp[cb] = checked;

                this.setState({
                    checkedAlternatives: checkedTmp
                })
            } else {
                references[cb].current.setChecked(checked);

                var checkedTmp = checkedAlternatives;
                checkedTmp[cb] = checked;

                this.setState({
                    checkedAlternatives: checkedTmp
                })
            }
        });
    }

    disableAllButOne(groupName, checkboxName) {
        const { references } = this.state;

        Object.keys(references).map(cb => {
            if (groupName === 'Kommune') {
                if (cb !== regionInfo.find(r => r.code === checkboxName).name) {
                    references[cb].current.toggleDisabled()
                }
            } else {
                if (cb !== checkboxName) {
                    references[cb].current.toggleDisabled()
                }
            }
        })
    }

    removeDisabling() {
        const { references } = this.state;

        Object.keys(references).map(cb => {
            if (references[cb].current.state.disabled)
                references[cb].current.toggleDisabled();
            
        });
    }
    /*
    updateAlternatives(input) {
        const { checkedAlternatives } = this.state;

        if (input === '') {

            this.setState({
                filtered: false
            }, () => {
                this.state.alternatives.map(alts => {
                    this.state.references[alts.props.value].current.setChecked(checkedAlternatives[alts.props.value]);
                });
            });
            return;
        }
        
        var tmp = this.state.alternatives.map(alts => {
            if (alts.props.value.toLowerCase().match(input) !== null) {
                return (
                    <FilterCheckbox 
                        value={alts.props.value} 
                        defaultCheckValue={this.state[alts.props.value]} 
                        checkboxGotUpdated={this.checkboxGotUpdated} 
                        ref={this.createAndReturnRef(alts.props.value, true)}
                    />
                )
            }
        });

        this.setState({
            filtered: true,
            filteredAlternatives: tmp,
        });
    }
    */
    searchForFilter(input) {
        const { alternatives, checkedAlternatives, filtered, references } = this.state;

        var tmp = [];
        alternatives.map(alts => {
            const { value } = alts.props;
            if (value.toLowerCase().match(input) !== null) {
                tmp.push(
                    <FilterCheckbox
                        key={'filteredcb ' + value}
                        value={value} 
                        defaultCheckValue={checkedAlternatives[value]} 
                        checkboxGotUpdated={this.checkboxGotUpdated} 
                        ref={this.createAndReturnRef(value, true)}
                    />
                )
            } 
        });

        if (input.length >= 3) {
            console.log(tmp);
            
            //show the filtered version
            this.setState({
                filteredAlternatives: tmp,
            }, () => {
                this.setState({
                    filtered: true,
                })
            });
            
        } else {
            if (filtered) {
                this.setState({
                    filtered: false,
                }, () => {
                    alternatives.map(alts => {
                        const { value } = alts.props;
        
                        references[value].current.setChecked(checkedAlternatives[value]);
                    });
                });
            }
        }
    }

    render() {
        const { alternatives, filtered, filteredAlternatives } = this.state;
        const { classes } = this.props;
        return (
            <FormGroup className={classes.root} row={true}>
                {filtered ? filteredAlternatives : alternatives}
            </FormGroup>
        )
    }
}

export default withStyles(styles)(FilterCheckboxGroup)