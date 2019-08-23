import React, { Component } from 'react';

/* Constants */
import { figureColors, highchartsOptions } from 'constants'

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
            swapped: false,
            chartOptions: {},
            series: {},
            categories: [],
        }

        this.swapGrouping = this.swapGrouping.bind(this);

        this.figureRef = React.createRef();
    }

    componentDidMount() {
        const { categories, figureType, series, title } = this.props;

        var options = highchartsOptions;

        options.chart.type = figureType;
        options.title.text = title;
        options.xAxis.categories = categories;
        options.series = series;
        options.colors = figureColors;

        var newCats = JSON.parse(JSON.stringify(categories));
        var newSeries = JSON.parse(JSON.stringify(series));

        //Enable hamburgermenu in chart
        HC_exporting(Highcharts);

        //Remove k notation on big numbers
        Highcharts.setOptions({
            /*column: {
                colorByPoint: true
            },
            colors: figureColors,*/
            lang: {
                numericSymbols: null //otherwise by default ['k', 'M', 'G', 'T', 'P', 'E']
            }
        });

       this.setState({
           chartOptions: options,
           series: newSeries,
           categories: newCats
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
        //const {  } = this.props;
        const { categories, series, swapped } = this.state;
        //const { categories, series } = this.props;

        // Already swapped, set series and categories back to original values
        if (swapped) {
            console.log('Already swapped, set figure back to original state');
            
            var options = {
                xAxis: {
                    categories: JSON.parse(JSON.stringify(categories))
                },
                series: JSON.parse(JSON.stringify(series)),
                colors: figureColors
            };

            
            this.setState({
                swapped: !this.state.swapped,
                chartOptions: options
            });

            return;
        } 
        
        console.log('Not swapped, change grouping and data');
        const newSeries = []
            
        categories.map(category => {
            newSeries.push({
                name: category,
                data: []
            });
        });

        const newCategory = [];
        series.map((item) => {
            newCategory.push(item.name);
            item.data.map((value, idx) => {
                newSeries[idx].data.push(value);
            })
        });

        var options = {
            series: newSeries,
            xAxis: {
                categories: newCategory
            },
            colors: figureColors
        }

        this.setState({
            swapped: !this.state.swapped,
            chartOptions: options
        });
    }

    render() {
        const { title } = this.props;
        const { chartOptions } = this.state;
        
        return(
            <HighchartsReact
                key={'figure' + title}
                highcharts={Highcharts}
                ref={this.figureRef}
                options={chartOptions}
                allowChartUpdate={true}
            />
        );
    }
}