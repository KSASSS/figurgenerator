import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

import Figure from './Figure.jsx'

/* Constants */
import {figureBaseUrl, getMethod} from 'constants'

export default class FigureBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            figure: [],
        }
    }

    componentDidMount() {
        var urlMeasures = this.props.measures.map(measureName => {
            var newName = measureName.replace(/\ /g, '%20');
            newName.replace(/æ/g, '%C3%A6')
            newName.replace(/ø/g, '%C3%B8')
            newName.replace(/å/g, '%C3%A5')

            return newName;
        })
        var datasets = '?datasett=' + urlMeasures;
        var years = '&årstall=' + this.props.years;
        var regions = '&regioner=' + this.props.regions;

        var url = figureBaseUrl + datasets + regions + years;

        var figureArr = [
            <Figure title={this.props.title} url={url} regions={this.props.regions} measures={this.props.measures}/>
        ]
        this.setState({
            figure: figureArr
        })
    }

    createUrl() {
        //https://statistikk-test.ks.no/api/RegionInfo/DynamicData?datasett=nettoinnflytting&regioner=0201&%C3%A5rstall=2017

        
    }

    render() {
        return(
            <Grid item xs={2}>
                {this.state.figure}
            </Grid>
        );
    }
}