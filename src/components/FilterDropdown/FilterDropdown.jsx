import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";

/* Dropdown imports */
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/* Brukes som tittel på dropdownsmenyene */
import Typography from "@material-ui/core/Typography";

import FilterCheckbox from 'components/FilterDropdown/FilterCheckbox.jsx';



export default class FilterDropdown extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      values: [],
    }

    this.filterGotChosen = this.filterGotChosen.bind(this);
    this.checkBoxList = React.createRef();
  }

  filterGotChosen(name, checked) {
    this.props.updateSidebar(this.props.title, name, checked);
  }

  updateCheckbox(name) {
    console.log('updateCheckbox');
    this.checkBoxList.current.changeCheckedState(name);
  }

  render() {
    return (
      <div className='filterdropdown'>
        <ExpansionPanel defaultExpanded={true}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{this.props.title}</Typography>
          </ExpansionPanelSummary>
             
          <ExpansionPanelDetails>
            <FilterCheckbox updateFilterDropdown={this.filterGotChosen} groupTitle={this.props.title} values={this.props.values} ref={this.checkBoxList}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      )
    }
}