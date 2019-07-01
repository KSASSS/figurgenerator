import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import FilterDropdown from './components/FilterDropdown/FilterDropdown.jsx'

class App extends React.Component {
    render() {
        return(
            <FilterDropdown />
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))