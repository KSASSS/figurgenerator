import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* Grid imports*/
import Grid from "@material-ui/core/Grid";

/* Paper import (brukes til å teste grid) */
import Paper from "@material-ui/core/Paper";

/* Sidebar imports */
import Sidebar from './components/Sidebar/Sidebar.jsx'

class App extends React.Component {
    render() {
        return(
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Paper>
                     <p>Tittel</p>
                    </Paper>  
                </Grid>
                <Grid item xs={2}>
                    <Sidebar />
                </Grid>
                <Grid item xs>
                    <Paper>
                        <p>Figurområde</p>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))