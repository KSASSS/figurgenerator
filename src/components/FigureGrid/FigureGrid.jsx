import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* FigurBox imports */
import FigureBox from './FigureBox.jsx'

export default class FigureGrid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            test: [],
            figureBoxes: [],
            figureBoxTracker: [],
            figureCounter: 0,
        }

        this.removeFigureBox = this.removeFigureBox.bind(this);
    }

    componentDidMount() {
        var tmp = [];
        var testArr = [
            'Box1',
            'Box2',
            'Box3'
        ]

        testArr.map(item => {
            tmp.push(<FigureBox title={item} />)
        })

        this.setState({test: tmp});
    }

    addFigureBox(activeFilters) {
        console.log('Adding a new figurebox with id figure' + this.state.figureCounter);
        var tmpFigBox = this.state.figureBoxes;
        var title = '';

        if (activeFilters.Region.length === 1) {
            title = activeFilters.Region[0];
        } else {
            title = activeFilters.Indikator[0];
        }
        
        tmpFigBox.push({
            id: 'figure' + this.state.figureCounter,
            figureBox: <FigureBox 
                key={'figure' + this.state.figureCounter}
                id={'figure' + this.state.figureCounter}
                number={this.state.figureCounter}
                title={title} 
                regions={activeFilters.Region}
                years={activeFilters.År}
                measures={activeFilters.Indikator}
                removeFigureBox={this.removeFigureBox}
            />
        }
            
        )
        
        this.setState({
            figureBoxes: tmpFigBox,
            figureCounter: this.state.figureCounter + 1
        })

        //console.log(this.state.figureBoxes);
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
        return(
            <Grid container item lg spacing={0} direction='row'>
                {this.state.figureBoxes.map(obj => {
                    return obj.figureBox
                })}
            </Grid>
            
        );
    }
}