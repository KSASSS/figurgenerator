import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

export default class ChosenFilterbutton extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    /** Kaller removeFilterButton metoden i gruppen den tilhører 
     * 
     */
    onClick() {
        this.props.removeButton(this.props.title);
    }

    render() {
        return(
            <div>
                <Button>{this.props.title}</Button>
            </div>
        );
    }
}