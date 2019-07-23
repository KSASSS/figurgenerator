import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Constants */
import { figureBaseUrl, getMethod, regionInfo } from 'constants'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_exporting from 'highcharts/modules/exporting'

export default class Figure extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            figure: [],
            figureType: 'column',
            data: [],
            pieData: [],
            years: [],
        }
    }

    componentDidMount() {
        console.log('Fetching data for figure');
        HC_exporting(Highcharts);
        
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

            var pieDataValues = dataWithRegionName.map(region => {
                return {
                    name: region.name,
                    y: (region.data.Data[this.props.measures][0] !== null ? region.data.Data[this.props.measures][0]: 0)
                }
            })

            /* Kode brukt for å endre navnene på x aksen til kommunenavn
            Trenger litt rework da år også må flyttes litt på.

            var xAxisData = this.props.regions.map(item => {
                return regionInfo.find(r => r.code === item).name 
            });
            */
            var options = {
                chart: {
                    type: this.props.figureType,
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
                yAxis: {
                    title: {
                        text: 'Verdi'
                    }
                },
                series: dataValues,
                credits: {
                    enabled: false,
                    text: 'ks.no',
                    href: 'https://www.ks.no'
                },
                exporting: { 
                    allowTable: false 
                },
            }

            var figureArr = []
            figureArr.push(<HighchartsReact
                highcharts={Highcharts}
                options={options}
                />)
            this.setState({
                figure: figureArr,
                data: dataValues,
                years: years,
                pieData: pieDataValues
            });
        });
    }

    changeFigureType(figureType) {
        var options = {};
        if (figureType !== 'pie') {
            console.log(this.state.data);
            options = {
                chart: {
                    type: figureType
                },
                title: {
                    text: this.props.measures,
                    style: {
                        fontSize: '10px'
                    }
                },
                xAxis: {
                    categories: this.state.years
                },
                series: this.state.data,
                credits: {
                    enabled: false,
                    text: 'ks.no',
                    href: 'https://www.ks.no'
                },
            }
        } else {
            console.log(this.state.pieData);
            options = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: this.props.measures,
                    style: {
                        fontSize: '10px'
                    }
                },
                yAxis: {
                    title: {
                        text: ''
                    }
                },/*
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },*/
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Regioner',
                    colorByPoint: true,
                    data: this.state.pieData
                }]
            }
        }

        var figureArr = []
        figureArr.push(
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
        this.setState({
            figure: figureArr
        });
        //change the figure to another type (chart, side, etc)
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