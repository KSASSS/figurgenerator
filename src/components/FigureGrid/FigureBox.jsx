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

/* Endre tittel imports */
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

import { Autorenew, Close } from 'mdi-material-ui'

import Figure from './Figure.jsx'

import { withStyles } from '@material-ui/styles';


/* Constants */
import { figureBaseUrl } from 'constants'

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
            open: false,
            closed: true,
            titleInput: '',
        }
        this.inputLabel = React.createRef(null);
        this.titleField = React.createRef();

        this.changeFigureType = this.changeFigureType.bind(this);
        this.figureElement = React.createRef();
        this.removeFigureBox = this.removeFigureBox.bind(this);
        this.changeFigureTitle = this.changeFigureTitle.bind(this);
        this.changeFigureGrouping = this.changeFigureGrouping.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleInput = this.handleInput.bind(this);
        
    }

    componentDidMount() {
        const { measures, number, regions, title} = this.props;

        var url = this.createUrl();

        
        console.log('Box title');
        console.log(title);
        var figureArr = [
            <Figure
                key={number + ' ' + title}
                figureType='column'
                measures={measures}
                regions={regions}
                title={title} ref={this.figureElement}
                url={url}                
            />
        ]
        this.setState({
            figure: figureArr,
            //labelWidth: this.inputLabel.current.offsetWidth,
            url: url,
            figureType: 1
        })
    }

    createUrl() {
        const { measures, regions, years } = this.props;

        var urlMeasures = measures.map(measureName => {
            var newName = measureName.replace(/\ /g, '%20');
            newName.replace(/æ/g, '%C3%A6')
            newName.replace(/ø/g, '%C3%B8')
            newName.replace(/å/g, '%C3%A5')

            return newName;
        });

        var datasetsQuery = '?datasett=' + urlMeasures.sort();
        var yearsQuery = '&årstall=' + years.sort();
        var regionsQuery = '&regioner=' + regions.sort();

        return figureBaseUrl + datasetsQuery + regionsQuery + yearsQuery;
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
        const { titleInput } = this.state;

        this.figureElement.current.changeTitle(titleInput);

        this.handleClose();
    }

    changeFigureGrouping(event) {
        this.figureElement.current.swapGrouping();
    }

    handleClose() {
        this.setState({
            open: false
        });
    }

    handleOpen() {
        this.setState({
            open: true
        });
    }

    handleInput(event) {
        this.setState({
            titleInput: event.target.value
        });
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
                    <Button className={classes.titleButton} onClick={this.handleOpen} >Endre tittel</Button>
                    <Button className={classes.swapButton} onClick={this.changeFigureGrouping}><Autorenew/></Button>
                    <Button className={classes.removeButton} onClick={this.removeFigureBox}>Fjern figur<Close /></Button>
                    <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Endre tittel</DialogTitle>
                        <DialogContent>
                            <TextField
                                ref={this.titleField}
                                onChange={this.handleInput}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Ny tittel"
                                type="email"
                                fullWidth
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Avbryt
                            </Button>
                            <Button onClick={this.changeFigureTitle} color="primary">
                                Endre
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(FigureBox);