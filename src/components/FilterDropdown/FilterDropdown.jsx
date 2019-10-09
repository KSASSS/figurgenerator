import React, {Component} from "react";

import { withStyles } from '@material-ui/styles';

/* Dropdown imports */
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ChevronDown from 'mdi-material-ui/ChevronDown';

/* Brukes som tittel på dropdownsmenyene */
import Typography from "@material-ui/core/Typography";

import TextField from '@material-ui/core/TextField';

import FilterCheckboxGroup from 'components/FilterDropdown/FilterCheckboxGroup.jsx';

const styles = theme => ({
  dropdown: {
    display: 'flex',
    overflowY: 'auto',
    maxHeight: 500,
  },
  dropdownTitle: {
    fontFamily: 'FuturaMedium',
  },
  searchfield: {
    width: '80%',
    paddingLeft: 10,
  }
});

class FilterDropdown extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      checkboxList: [],
    }

    this.filterGotChosen = this.filterGotChosen.bind(this);
    this.searchForFilter = this.searchForFilter.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.checkboxReferences = React.createRef();
  }

  componentDidMount() {
    var tmpArr = [
      <FilterCheckboxGroup key={this.props.title} 
        updateFilterDropdown={this.filterGotChosen} 
        groupTitle={this.props.title} 
        values={this.props.values} 
        ref={this.checkboxReferences}
      />
    ]

    this.setState({
      checkboxList: tmpArr
    })
  }

  filterGotChosen(name, checked) {
    this.props.updateSidebar(this.props.title, name, checked);
  }

  updateCheckbox(name) {
    this.checkboxReferences.current.changeCheckedState(name);
  }

  searchForFilter(input) {
    this.checkboxReferences.current.updateAlternatives(input);
  }

  disableAllButOne(groupName, checkboxName) {
    console.log('filterdropdown');
    this.checkboxReferences.current.disableAllButOne(groupName, checkboxName);
  }

  removeDisabling() {
    this.checkboxReferences.current.removeDisabling();
  }

  removeDisablingAllButOne(checkboxName) {
    this.checkboxReferences.current.removeDisablingAllButOne(checkboxName);
  }

  handleInput() {
    this.checkboxReferences.current.searchForFilter(event.target.value);
  }

  render() {
    const { classes, searchAble } = this.props;
    return (
      <div className='filterdropdown'>
        <ExpansionPanel defaultExpanded={false}>
          <ExpansionPanelSummary
            expandIcon={<ChevronDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.dropdownTitle}>{this.props.title}</Typography>
          </ExpansionPanelSummary>
          {searchAble ?
            <TextField 
              className={classes.searchfield} 
              type='text' 
              placeholder='Søk etter filter' 
              onChange={this.handleInput}
            />
            : 
            null
          }
          <ExpansionPanelDetails className={classes.dropdown}>
            {this.state.checkboxList}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      )
    }
}
export default withStyles(styles)(FilterDropdown)