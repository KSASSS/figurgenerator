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
      checked: false,
    }

    this.filterGotChosen = this.filterGotChosen.bind(this);
  }

  filterGotChosen(name) {
    console.log('filterchosen - fdd');
    this.props.updateSidebar(this.props.title, name)
  }

  render() {
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{this.props.title}</Typography>
          </ExpansionPanelSummary>
             
          <ExpansionPanelDetails>
            <FilterCheckbox updateFilterDropdown={this.filterGotChosen} values={this.props.values}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      )
    }
}