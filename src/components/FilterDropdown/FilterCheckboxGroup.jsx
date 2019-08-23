import React, {Component} from "react";

/* Checkbox imports */
import FormGroup from "@material-ui/core/FormGroup";

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

class FilterCheckboxGroup extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            filtered: false,
            alternatives: [],
            filteredReferences: [],
            references: [],
            checkedAlternatives: {},
            disabledAlternatives: {},
            filteredAlternatives: [],
        }

        this.checkAll = this.checkAll.bind(this);
        this.checkboxGotUpdated = this.checkboxGotUpdated.bind(this);
        this.createAndReturnRef = this.createAndReturnRef.bind(this);
        this.searchForFilter = this.searchForFilter.bind(this);
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

        var t = 'Merk/fjern alle'
        
        var checkedTmp = {
            [t]: false
        };

        var disabledTmp = {
            [t]: false
        }
        values.map(item => {
            checkedTmp[item] = false;
            disabledTmp[item] = false;

            alternativesArr.push(
                <FilterCheckbox
                    key={this.props.groupTitle + item}
                    value={item} 
                    defaultCheckValue={false} 
                    checkboxGotUpdated={this.checkboxGotUpdated} 
                    ref={this.createAndReturnRef(item, false)}
                />
            )
        });

        this.setState({
            alternatives: alternativesArr,
            checkedAlternatives: checkedTmp,
            disabledAlternatives: disabledTmp,
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

        tmpRef = references;
        tmpRef[id] = React.createRef();
        this.setState({
            references: tmpRef
        });

        return this.state.references[id];
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
        const { disabledAlternatives, references } = this.state;

        var disabledTmp = disabledAlternatives;
        Object.keys(references).map(cb => {
            if (references[cb].current !== null) {
                if (groupName === 'Kommune') {
                    if (cb !== regionInfo.find(r => r.code === checkboxName).name) {
                        references[cb].current.toggleDisabled();
                        disabledTmp[cb] = true;
                    }
                } else {
                    if (cb !== checkboxName) {
                        references[cb].current.toggleDisabled()
                        disabledTmp[cb] = true;
                    }
                }
            }
        })

        this.setState({
            disabledAlternatives: disabledTmp
        });
    }

    removeDisabling() {
        const { disabledAlternatives, references } = this.state;

        var disabledTmp = disabledAlternatives;
        Object.keys(references).map(cb => {
            if (references[cb].current !== null) {
                if (references[cb].current.state.disabled) {
                    references[cb].current.toggleDisabled();
                    disabledTmp[cb] = false;
                }
            }
        });

        this.setState({
            disabledAlternatives: disabledTmp
        });
    }

    searchForFilter(input) {
        const { alternatives, checkedAlternatives, disabledAlternatives, filtered, references } = this.state;

        var tmp = [];
        alternatives.map(alts => {
            const { value } = alts.props;
            if (value.toLowerCase().match(input) !== null && value !== 'Merk/fjern alle') {
                tmp.push(alts)
            } 
        });

        if (input.length >= 3) {
            console.log('Showing the filtered version');

            this.setState({
                filteredAlternatives: tmp,
                filtered: true
            }, () => {
                // Set the checked and disabled values of the active checkboxes
                Object.keys(references).map(checkbox => {
                    console.log(checkbox);
                    if (references[checkbox].current !== null) {
                        references[checkbox].current.setChecked(checkedAlternatives[checkbox]);
                        references[checkbox].current.setDisabled(disabledAlternatives[checkbox]);
                    }
                });
            });
            
        } else {
            console.log('Showing the unfiltered version');
            if (filtered) {
                this.setState({
                    filtered: false,
                }, () => {
                    alternatives.map(alts => {
                        const { value } = alts.props;
        
                        references[value].current.setChecked(checkedAlternatives[value]);
                        references[value].current.setDisabled(disabledAlternatives[value]);
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