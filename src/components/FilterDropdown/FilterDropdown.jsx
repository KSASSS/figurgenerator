import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";

/* Dropdown imports */
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

/* Brukes som tittel på dropdownsmenyene */
import Typography from "@material-ui/core/Typography";



export default class FilterDropdown extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {

    }
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
                <Typography>{this.props.tittel}</Typography>
              </ExpansionPanelSummary>
              
            <ExpansionPanelDetails>
              <p>Valg</p>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      )
    }
}