import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Constants */
import {figureBaseUrl, getMethod} from 'constants'

export default class Figure extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            years: [],
            measures: [],
            urlMeasures: [],
            hasThreeFilters: true,
            values: [],
        }
    }

    componentDidMount() {
        //Fetch data using props
        /*fetch(`${indikatorURL}`, getMethod)
        .then(response => response.json())
        .then(result => {
            console.log('data');
        })*/
        this.createUrl();
    }

    updateFigure(cities, years, measures) {
        //update the figure with new values
    }

    unMountFigure() {
        this.setState({hasThreeFilters: !this.state.hasThreeFilters});
    }

    createUrl() {
        var test = `${figureBaseUrl}`;
        var test2 = ['Drammen', 'Oslo'];

        var test3 = '&regioner=' + test2;
        console.log(test3);

        return test;
    }

    transformMeasureNameToUrlName() {
        var newName = measurename.replace(/\ /g, '%20');
        newName = newName.replace(/æ/g, '%C3%A6')
        newName = newName.replace(/ø/g, '%C3%B8')
        newName = newName.replace(/å/g, '%C3%A5')
      
        this.setState({measureName: newName});
      }

    render() {
        return(
            this.state.hasThreeFilters ? 
                <Grid item xs>
                    <Paper>{this.props.title}</Paper>
                </Grid>
                :
                null
        );
    }
}