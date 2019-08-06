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
            title: '',
            options: {},
            swapped: false,
            categories: {},
            series: {},
        }

        this.figureRef = React.createRef();
    }

    componentDidMount() {
        const { measures, regions, url, years } = this.props;
        var series = [];
        var categories = [];
        console.log('Fetching data for figure');
        console.log(url);
        
        fetch(url, getMethod)
        .then(result => {
            return result.json();
        })
        .then(data => {
            //TODO check if 200 or not?
            console.log('Data was fetched successfully');
            console.log(data);

            if (measures.length === 1) {
                console.log('Kun en measure');
            } else if (regions.length === 1) {
                console.log('Kun en region');
            } else {
                console.log('Kun ett år');
                categories = Object.keys(data).map(regionNumber => {
                    return regionInfo.find(r => parseInt(r.code) === parseInt(regionNumber)).name;
                })
                Object.keys(data).map(regionNumber => {
                    Object.keys(data[regionNumber].Data).map(measureName => {
                        console.log('Keys');
                        var seriesPoint = series.find(s => s.name === measureName);
                        if (seriesPoint === undefined) {
                            series.push({
                                name: measureName,
                                data: data[regionNumber].Data[measureName]
                            });
                        } else {
                            seriesPoint.data.push(data[regionNumber].Data[measureName][0]);
                        }
                    });
                });
                console.log('Series')
                console.log(series);
                console.log('Categories: ' + categories);
            }


            /*            
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
                this.props.measures.map(measure => {
                    return {
                        name: region.name,
                        data: (region.data.Data[measure] !== null ? region.data.Data[measure]: 0)
                    }
                })
            })
            /*
            var pieDataValues = dataWithRegionName.map(region => {
                console.log(region.data);
                console.log(region.data.Data[this.props.measures[0]]);
                return {
                    name: region.name,
                    y: (region.data.Data[this.props.measures][0] !== null ? region.data.Data[this.props.measures][0]: 0)
                }
            })
            */
            var options = this.createOptions(this.props.figureType, this.props.title, categories, series);

            //Enable hamburgermenu in chart
            HC_exporting(Highcharts);

            //Remove k notation on big numbers
            Highcharts.setOptions({
                lang: {
                    numericSymbols: null //otherwise by default ['k', 'M', 'G', 'T', 'P', 'E']
                },
            })
            
            var figureArr = [];
            figureArr.push(
                <HighchartsReact
                    highcharts={Highcharts}
                    ref={this.figureRef}
                    options={options}
                />
            );

            this.setState({
                figure: figureArr,
                data: series,
                series: series,
                years: years,
                //pieData: pieDataValues,
                options: options,
                type: this.props.figureType,
                title: this.props.title,
                categories: categories
            });
        });
    }

    changeFigureType(figureType) {
        const { title, data, years } = this.state;

        console.log('Changing from ' + this.state.type + ' to ' + figureType);

        var options = this.createOptions(figureType, title, years, data);

        var newType = {
            chart: {
                type: figureType
            }
        }

        this.figureRef.current.chart.update(newType);
        this.setState({
            type: figureType,
            swapped: false,
        });
    }

    unMountFigure() {
        //TODO?
    }

    createOptions(type, title, groups, dataValues) {
        var options = {};
        if (type !== 'pie') {
            options = {
                chart: {
                    type: type,
                    width: 500,
                },
                title: {
                    text: title,
                    style: {
                        fontSize: '15px'
                    }
                },
                xAxis: {
                    categories: groups
                },
                yAxis: {
                    title: {
                        text: '',
                        //text: 'Verdi'
                    }
                },
                series: dataValues,
                credits: {
                    enabled: true,
                    text: 'ks.no',
                    href: 'https://www.ks.no'
                },
                exporting: { 
                    allowTable: false 
                },
            };
        } else {
            options = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: title,
                    style: {
                        fontSize: '15px'
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                            style: {
                              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    name: 'Regioner',
                    colorByPoint: true,
                    data: this.state.pieData
                }],
            };
        }
        

        return options;
    }

    changeTitle(newTitle) {
        const { type, years, data} = this.state;
        var options = this.createOptions(type, newTitle, years, data);

        var options = {
            title: {
                text: newTitle
            }
        }

        this.figureRef.current.chart.update(options);
        /*var figureArr = []
        figureArr.push(
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );*/
        this.setState({
            //figure: figureArr,
            options: options
        });
    }

    createFigure(options) {
        var figureArr = []
        figureArr.push(
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
        this.setState({
            figure: figureArr,
            options: options
        });
    }

    swapGrouping() {
        console.log('Swapping grouping');
        const { data, years, swapped, type, title, categories, series } = this.state;

        if (swapped) {
            //var options = this.createOptions(type, title, years, data);
            //this.createFigure(options);

            var options = {
                xAxis: {
                    categories: categories
                },
                series: series
            }

            this.figureRef.current.chart.update(options, true, true);
            this.setState({
                swapped: !swapped
            });
            return;
        }
        
        var newSeries = [];
        var newCategory = [];
        series.map((item, idx) => {
            newCategory.push(item.name);
            item.data.map((value, idx) => {
                if (newSeries[idx] === undefined) {
                    newSeries[idx] = {
                        name: categories[idx],
                        data: [value]
                    };
                } else {
                    newSeries[idx].data.push(value);
                }
            })
        });

        var options = {
            series: newSeries,
            xAxis: {
                categories: newCategory
            }
        }

        this.figureRef.current.chart.update(options, true, true);
        this.setState({
            swapped: !swapped
        });
    }

    render() {
        return(
            this.state.figure
        );
    }
}