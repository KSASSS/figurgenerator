import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

import Box from '@material-ui/core/Box';

/* FigurBox imports */
import FigureBox from './FigureBox.jsx'

import { withStyles } from '@material-ui/styles';

import { regionInfo } from 'constants'

const styles = theme => ({
    root: {
      display: 'flex',
    },
  });

class FigureGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            figureBoxes: [],
            figureBoxTracker: [],
            figureCounter: 0,
        }

        this.removeFigureBox = this.removeFigureBox.bind(this);
    }

    addFigureBox(activeFilters) {
        const { figureBoxes, figureCounter } = this.state;
        var newAF = JSON.parse(JSON.stringify(activeFilters));
        console.log('Adding a new figurebox with id figure' + figureCounter);
        console.log(newAF);
        console.log(JSON.stringify(activeFilters));
        console.log(JSON.parse(JSON.stringify(activeFilters)));
        console.log(activeFilters);
        var title = '';
        if (newAF.Indikator.length === 1){
            title = newAF.Indikator[0];
        } else if (newAF.Kommune.length === 1) {
            title = regionInfo.find(r => r.code === newAF.Kommune[0]).name;
        } else {
            title = newAF.År[0];
        }

        var tmpFigBox = figureBoxes;
        tmpFigBox.push({
            id: 'figure' + figureCounter,
            figureBox: 
                <FigureBox 
                    key={'figure' + figureCounter}
                    id={'figure' + figureCounter}
                    number={figureCounter}
                    title={title} 
                    regions={newAF.Kommune}
                    years={newAF.År}
                    measures={newAF.Indikator}
                    removeFigureBox={this.removeFigureBox}
                />
        }
            
        )
        
        this.setState({
            figureBoxes: tmpFigBox,
            figureCounter: this.state.figureCounter + 1
        })
    }

    removeFigureBox(id) {
        console.log('Removing figurebox with id ' + id);
        var tmpArr = this.state.figureBoxes;
        tmpArr = tmpArr.filter(item => item.id !== id)

        this.setState({
            figureBoxes: tmpArr
        })
    }

    render() {
        const { classes } = this.props;

        return(
            <Box display='flex' flexWrap='wrap'>
                {this.state.figureBoxes.map(obj => {
                    return obj.figureBox
                })}
            </Box>
            
        );
    }
}

export default withStyles(styles)(FigureGrid);