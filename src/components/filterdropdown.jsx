import React from "react";

/* Dropdown imports */
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

class FilterDropdown extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                Menynavn
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              
            </ExpansionPanelDetails>
          </ExpansionPanel>
    }
}