import React, { Component } from 'react';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Constants */
import { highchartsOptions, figureBaseUrl, getMethod, regionInfo } from 'constants'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HC_exporting from 'highcharts/modules/exporting'

export default class Figure extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            figure: [],
            figureType: 'column',
            pieData: [],
            title: '',
            swapped: false,
        }

        this.figureRef = React.createRef();
    }

    componentDidMount() {
        const { categories, figureType, series, title } = this.props;

        var options = highchartsOptions;

        options.chart.type = figureType;
        options.title.text = title;
        options.xAxis.categories = categories;
        options.series = series;

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
            type: figureType,
            title: title,
        });
    }

    changeFigureType(figureType) {
        console.log('Changing from ' + this.state.type + ' to ' + figureType);

        var newType = {
            chart: {
                type: figureType
            }
        }

        this.figureRef.current.chart.update(newType);
        this.setState({
            type: figureType,
        });
    }

    changeTitle(newTitle) {
        var options = {
            title: {
                text: newTitle
            }
        }

        this.figureRef.current.chart.update(options);
    }

    swapGrouping() {
        console.log('Swapping grouping');
        const { swapped } = this.state;
        const { categories, series } = this.props;

        // Already swapped, set series and categories back to original values
        if (swapped) {
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