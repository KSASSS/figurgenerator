import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Constants */
import {figureBaseUrl, getMethod} from 'constants'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default class Figure extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {},
            cities: [],
            years: [],
            measures: [],
            urlMeasures: [],
            hasThreeFilters: true,
            values: [],
            figure: [],
        }
    }

    componentDidMount() {
        console.log(this.props);
        
        fetch(this.props.url, getMethod)
        .then(result => {
            console.log(result);
            return result.json();
        })
        .then(data => {

            var years = this.props.regions.map(regionName => {
                return data[regionName].Years;
            })

            var data = this.props.regions.map(regionName => {
                if (data[regionName].Data[this.props.measures] !== undefined)
                    return data[regionName].Data[this.props.measures][0];
                else
                    return [0];
            })

            /**
             * const options = {
                    title: {
                        text: 'My chart'
                    },
                    series: [{
                        data: [1, 2, 3]
                    }]
                }
             */
            var options = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: this.props.measures,
                    style: {
                        fontSize: '10px'
                    }
                },
                xAxis: {
                    categories: this.props.regions
                },
                series: [{
                    name: years,
                    data: data
                }],
                credits: {
                    enabled: false,
                    text: 'ks.no',
                    href: 'https://www.ks.no'
                },
            }
            console.log(years);
            console.log(data);
            /*var options = {
                chart: {
                    type: 'column'
                },
                title: {
                  text: 'Test',
                  style: {
                    fontSize: '10px'
                  }
                },
                credits: {
                  enabled: false,
                  text: 'ks.no',
                  href: 'https://www.ks.no'
                },
                xAxis: {
                    categories: years
                },
                yAxis: {
                  title: null,
                },
                series: [{
                    data,
                }],
          
                exporting: {
                  allowTable: false,
              }
            }*/

            var figureArr = []
            figureArr.push(<HighchartsReact
                highcharts={Highcharts}
                options={options}
                />)
            this.setState({
                figure: figureArr
            });
        });
        this.createUrl();
    }

    updateFigure(cities, years, measures) {
        //update the figure with new values
    }

    unMountFigure() {
        this.setState({hasThreeFilters: !this.state.hasThreeFilters});
    }

    createUrl() {
        /*var newName = measurename.replace(/\ /g, '%20');
        newName = newName.replace(/æ/g, '%C3%A6')
        newName = newName.replace(/ø/g, '%C3%B8')
        newName = newName.replace(/å/g, '%C3%A5')

        var test = `${figureBaseUrl}`;
        var test2 = ['Drammen', 'Oslo'];

        var test3 = '&regioner=' + test2;
        console.log(test3);

        return test;*/
    }

    transformMeasureNameToUrlName() {
        /*var newName = measurename.replace(/\ /g, '%20');
        newName = newName.replace(/æ/g, '%C3%A6')
        newName = newName.replace(/ø/g, '%C3%B8')
        newName = newName.replace(/å/g, '%C3%A5')
      
        this.setState({measureName: newName});*/
    }

    render() {
        return(
            this.state.figure
        );
    }
}