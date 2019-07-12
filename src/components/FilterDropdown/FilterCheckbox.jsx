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
            references: [],
        }

        this.handleChange = this.handleChange.bind(this);

    }


    /* On mount create the checkbox alternatives */
    componentDidMount() {
        const values = this.props.values;

        var alternativesArr = [];
        
        for (var i = 0; i < values.length; i++) {
            /** Creates a new state for each option */
            this.setState({[values[i]]: false});
            this.createRef(values[i]);
            alternativesArr.push(
                <FormControlLabel key={values[i]}
                    onChange={this.handleChange}
                    checked={this.state[values[i]]}
                    control = {
                        <Checkbox
                            ref={this.getRef(values[i])}
                            value = {values[i]}
                        />
                    }
                    label = {values[i]}
                />
            )
            //console.log(this.state.references['Drammen']);
        }
        
        this.setState({
            alternatives: alternativesArr
        });
    }

    /* Sets the state with corresponding name to true when checked, false when unchecked*/
    handleChange() {
        //console.log(event.target);
        this.props.updateFilterDropdown(event.target.value, event.target.checked);
        this.setState({[event.target.value]: event.target.checked});

        /**
         * <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
         * <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
         * "<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>"
         */
    } 

    getRef(id) {
        return this.state.references[id];
    }

    createRef(id) {
        var tmpRef = this.state.references;
        tmpRef[id] = React.createRef();
        this.setState({references: tmpRef});
    }

    changeCheckedState(checkboxName) {
        var checked = !this.state[checkboxName];
        //console.log(this.state);
        this.setState({
            [checkboxName]: !this.state[checkboxName]
        }, () => {
            //this.setState({alternatives: this.state.alternatives});
        });
        /*console.log(this.state.references[checkboxName]);
        console.log(this.state.references[checkboxName].current);
        //console.log(this.state.references[checkboxName].current.firstChild.lastChild);
        console.log(this.state.references[checkboxName].current.firstChild.firstChild.firstChild);
        //console.log(this.state.references[checkboxName].current.firstChild.lastChild.checked);
        this.state.references[checkboxName].current.firstChild.lastChild.checked = false;
        console.log(this.state.references[checkboxName].current.firstChild.lastChild.checked);
        //console.log(this.state.references[checkboxName].current.firstChild[0]);
        /*var tmp = this.state.alternatives.find(cb => cb.key === checkboxName);

        if (tmp !== -1) {
            var i = this.state.alternatives.indexOf(tmp);
            var tmpArr = this.state.alternatives;
            tmpArr.splice(i, 1)
            .then(result => {
                console.log(tmpArr);
            });

            
            this.setState({alternatives: null})

            tmpArr.push(
                <FormControlLabel key={checkboxName}
                    onChange={this.handleChange}
                    control = {
                        <Checkbox
                            value = {checkboxName}
                        />
                    }
                    label = {checkboxName}
                />
            )
            */
            //this.setState({alternatives: tmpArr})
        //}
    }

    render() {
        return (
            <FormControl>
            <FormGroup row={true}>      
                {this.state.alternatives}
            </FormGroup>
            </FormControl>
            /*
            <div className='filtercheckbox'>
                <FormControl component = "fieldset">
                    <FormGroup row={true}>      
                        {this.state.alternatives}
                    </FormGroup>
                </FormControl>
            </div>
            */
        )
    }
}