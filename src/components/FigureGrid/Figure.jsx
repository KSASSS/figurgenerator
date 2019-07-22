import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Constants */
import { figureBaseUrl, getMethod, regionInfo } from 'constants'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default class Figure extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            figure: [],
        }
    }

    componentDidMount() {
        console.log('Fetching data for figure');
        fetch(this.props.url, getMethod)
        .then(result => {
            return result.json();
        })
        .then(data => {
            //TODO check if 200 or not?
            console.log('Data was fetched successfully');
            var dataWithRegionName = this.props.regions.map(regionNumber => {
                var region = parseInt(regionNumber);
                return {
                    name: regionInfo.find(r => r.code === regionNumber).name,
                    data: (data[region])
                }
            });

            dataWithRegionName.sort(function(a, b){
                return a.name.localeCompare(b.name)
            })

            var years = data[parseInt(this.props.regions[0])].Years;

            var dataValues = dataWithRegionName.map(region => {
                return {
                    name: region.name,
                    data: (region.data.Data[this.props.measures] !== null ? region.data.Data[this.props.measures]: 0)
                }
            })

            /* Kode brukt for å endre navnene på x aksen til kommunenavn
            var xAxisData = this.props.regions.map(item => {
                return regionInfo.find(r => r.code === item).name 
            });
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
                    categories: years
                },
                series: dataValues,
                credits: {
                    enabled: false,
                    text: 'ks.no',
                    href: 'https://www.ks.no'
                },
            }

            var figureArr = []
            figureArr.push(<HighchartsReact
                highcharts={Highcharts}
                options={options}
                />)
            this.setState({
                figure: figureArr
            });
        });
    }

    updateFigure(cities, years, measures) {
        //update the figure with new values
    }

    unMountFigure() {
        //TODO?
    }

    render() {
        return(
            this.state.figure
        );
    }
}