import React, {Component} from "react";

/* Checkbox imports */
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";

export default class FilterCheckbox extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            alternatives: [],
            checked: []
        }

        this.handleChange = this.handleChange.bind(this);

    }


    /* On mount create the checkbox alternatives */
    componentDidMount() {
        const values = this.props.values;

        var checkboxArr = [];
        var clickedArr = [];

        for (var i = 0; i < values.length; i++) {
            checkboxArr.push(
                <FormControlLabel key = {values[i]}
                    control = {
                        <Checkbox
                            onChange = {this.handleChange}
                            value = {values[i]}
                        />
                    }
                    label = {values[i]}
                />
            )
            this.setState({[values[i]]: false});
        }
        this.setState({alternatives: checkboxArr, checked: clickedArr});
    }

    /* Sets the state with corresponding name to true when checked, false when unchecked*/
    handleChange() {
        this.setState({[event.target.value]: event.target.checked});
    };    
    
    printCheck(value) {
        console.log(value);
    }

    render() {
        return (
            <div>
                <FormControl component = "fieldset">
                    <FormGroup row={true}>      
                        {this.state.alternatives}
                    </FormGroup>
                </FormControl>
            </div>
        )
    }
}