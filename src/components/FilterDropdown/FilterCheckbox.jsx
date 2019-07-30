import React, {Component} from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default class FilterCheckbox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
        }

        this.handleChange = this.handleChange.bind(this);
        this.isChecked = this.isChecked.bind(this);
    }

    componentDidMount() {
        this.setState({
            checked: this.props.defaultCheckValue
        });
    }

    setChecked(checked) {
        console.log('Setting ' + this.props.value + ' checked as ' + checked);
        this.setState({
            checked: checked
        });
    }

    handleChange(event) {
        this.setState({
            checked: event.target.checked
        })

        if (event.target.value === 'Alle') {
            this.props.checkAll(event.target.checked)
        } else {
            this.props.checkboxGotUpdated(this.props.value, event.target.checked);
        }
    }

    isChecked() {
        return this.state.checked;
    }

    render() {
        return (
            <FormControlLabel
                label={this.props.value}
                control= {
                    <Checkbox
                        value={this.props.value}
                        onChange={this.handleChange}
                        checked={this.state.checked}
                    />
                }
            />
        )
    }

}