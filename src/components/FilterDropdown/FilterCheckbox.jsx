import React, {Component} from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";

import { withStyles } from '@material-ui/styles';

const styles = theme => ({
    checkbox: {
        fontSize: 12,
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
        }

        this.handleChange = this.handleChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    componentDidMount() {
        const { defaultCheckValue } = this.props;
        this.setState({
            checked: defaultCheckValue
        });
    }

    setChecked(checked) {
        //console.log('Setting ' + this.props.value + ' checked as ' + checked);
        this.setState({
            checked: checked
        });
    }

    handleChange() {
        this.setState({
            checked: event.target.checked
        })

        if (event.target.value === 'Merk/fjern alle') {
            this.props.checkAll(event.target.checked)
        } else {
            this.props.checkboxGotUpdated(this.props.value, event.target.checked);
        }
    }

    isChecked() {
        return this.state.checked;
    }

    toggleDisabled() {
        this.setState({
            disabled: !this.state.disabled
        });
    }

    render() {
        const { classes, value } = this.props;
        return (
            <FormControlLabel className={value === 'Merk/fjern alle' ? classes.allCheckbox: classes.checkbox}
                label={
                    <Typography className={classes.checkbox}>
                        {value}
                    </Typography>
                }
                control= {
                    <Checkbox
                        value={value}
                        onChange={this.handleChange}
                        checked={this.state.checked}
                        disabled={this.state.disabled}
                    />
                }
            />
        )
    }
}

export default withStyles(styles)(FilterCheckbox)