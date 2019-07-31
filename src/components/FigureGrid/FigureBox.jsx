import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Input from "@material-ui/core/Input";

import Box from '@material-ui/core/Box';

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

import { Autorenew, Close } from 'mdi-material-ui'

import Figure from './Figure.jsx'

import { withStyles } from '@material-ui/styles';


/* Constants */
import {figureBaseUrl, getMethod} from 'constants'

const styles = theme => ({
    root: {
        display: 'flex',
        padding: '0px 10px 10px 0px',
    },
    paper: {
        
    },
    removeButton: {
        color: 'red',
        width: '33%',
    },
    titleButton: {
        width: '33%',
    },
    swapButton: {
        width: '33%',
    }
  });

class FigureBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            figure: [],
            labelWidth: 0,
            figureType: 1   ,
            url: '',
        }
        this.inputLabel = React.createRef(null);
        this.changeFigureType = this.changeFigureType.bind(this);
        this.figureElement = React.createRef();
        this.removeFigureBox = this.removeFigureBox.bind(this);
        this.changeFigureTitle = this.changeFigureTitle.bind(this);
        this.changeFigureGrouping = this.changeFigureGrouping.bind(this);
    }

    componentDidMount() {
        var urlMeasures = this.props.measures.map(measureName => {
            var newName = measureName.replace(/\ /g, '%20');
            newName.replace(/æ/g, '%C3%A6')
            newName.replace(/ø/g, '%C3%B8')
            newName.replace(/å/g, '%C3%A5')

            return newName;
        })
        var datasets = '?datasett=' + urlMeasures.sort();
        var years = '&årstall=' + this.props.years.sort();
        var regions = '&regioner=' + this.props.regions.sort();

        var url = figureBaseUrl + datasets + regions + years;

        var figureArr = [
            <Figure key={this.props.number + ' ' + this.props.title} title={this.props.title} ref={this.figureElement} figureType='column' url={url} regions={this.props.regions} measures={this.props.measures}/>
        ]
        this.setState({
            figure: figureArr,
            //labelWidth: this.inputLabel.current.offsetWidth,
            url: url,
            figureType: 1
        })
    }

    changeFigureType(value) {
        console.log('Changing figure type from ' + this.state.figureType + ' to ' + value)
        var type = '';

        if (this.state.figureType === value)
            return;

        switch(value) {
            case 1:
                type = 'column';
                break;
            case 2:
                type = 'line';
                break;
            case 3:
                type = 'bar';
                break;
            case 4:
                type = 'pie';
                break;

        }
        
        this.figureElement.current.changeFigureType(type);
        this.setState({
            figureType: value
        });
    }

    removeFigureBox() {
        this.setState({
            figure: null
        });

        this.props.removeFigureBox(this.props.id);
    }

    changeFigureTitle(event) {
        this.figureElement.current.changeTitle('test');
    }

    changeFigureGrouping(event) {
        this.figureElement.current.swapGrouping();
    }

    render() {
        const { figureType } = this.state;
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <Paper className={classes.paper}>
                       
                    <InputLabel ref={this.inputLabel} htmlFor="outlined-age-simple">
                        Figurtype
                    </InputLabel>
                    <Select
                        name='figuretype'
                        value={figureType}
                        onChange={event => this.changeFigureType(event.target.value)}
                        fullWidth={true}
                    >
                        <MenuItem key='wtf1' value={1}>Column</MenuItem>
                        <MenuItem key='wtf2' value={2}>Line</MenuItem>
                        <MenuItem key='wtf3' value={3}>Bar</MenuItem>
                        <MenuItem key='wtf4' value={4}>Pie</MenuItem>
                    </Select>
                    {this.state.figure}
                    <Button className={classes.titleButton} onClick={this.changeFigureTitle} disabled>Endre tittel</Button>
                    <Button className={classes.swapButton} onClick={this.changeFigureGrouping}><Autorenew/></Button>
                    <Button className={classes.removeButton} onClick={this.removeFigureBox}>Fjern figur<Close /></Button>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(FigureBox);