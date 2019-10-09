import React, {Component} from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    checkbox: {
        fontSize: 12,
        fontFamily: 'SourceSansProRegular',
    },
    allCheckbox: {
        width: '100%',
    },
});

class FilterCheckbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            disabled: false,
            value: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    componentDidMount() {
        const { defaultCheckValue, value } = this.props;
        this.setState({
            checked: defaultCheckValue,
            value: value
        });
    }

    setChecked(checked) {
    console.log('Setting ' + this.props.value + ' checked as ' + checked);
        
        this.setState({
            checked: checked
        });
    }

    setDisabled(disabled) {
        console.log('Setting ' + this.props.value + ' disabled as ' + disabled);

        this.setState({
            disabled: disabled
        });
    }

    handleChange(event) {
        const { value } = this.props;
        console.log('handleChange ' + event.target.value);
        this.setState({
            checked: event.target.checked
        })

        if (event.target.value === 'Merk/fjern alle') {
            this.props.checkAll(event.target.checked)
        } else {
            this.props.checkboxGotUpdated(value, event.target.checked);
        }
    }

    isChecked() {
        console.log('isChecked');
        return this.state.checked;
    }

    toggleDisabled() {
        console.log('toggleDisabled');
        this.setState({
            disabled: !this.state.disabled
        });
    }

    render() {
        const { checkboxGroup, classes/*, value*/ } = this.props;
        const { checked, disabled, value } = this.state;
        return (
            <FormControlLabel className={value === 'Merk/fjern alle' ? classes.allCheckbox: classes.checkbox}
                label={
                    <Typography className={classes.checkbox}>
                        {checkboxGroup === 'Indikator' ? value.slice(3, value.length) : value}
                    </Typography>
                }
                control= {
                    <Checkbox
                        value={value}
                        onChange={this.handleChange}
                        checked={checked}
                        disabled={disabled}
                    />
                }
            />
        )
    }
}

export default withStyles(styles)(FilterCheckbox)