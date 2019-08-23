import React, {Component} from "react";

/* Constants */
import { indikatorURL, getMethod, regionInfo, validYears } from 'constants'
import Plus  from 'mdi-material-ui/Plus'

/* Dropdown imports */
import FilterDropdown from 'components/FilterDropdown/FilterDropdown.jsx'

import Button from '@material-ui/core/Button';

import Box from '@material-ui/core/Box';

import { withStyles } from '@material-ui/styles';

import { drawerWidth } from 'constants'

import Drawer from '@material-ui/core/Drawer';

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        height: 'calc(100% - 32px)',
        top: 32,
    },
    addFigureButton: {
        position: 'fixed',
        height: 32,
        padding: '0px'
    },
    content: {
      flexGrow: 1,
    },
    searchfield: {
        width: drawerWidth - 8,
        top: 42,
        position: 'fixed',
    }
});
class Sidebar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            indikatorer: [],
            chosenFilters: [],
            filterDropdowns: [],
            references: [],
        }

        this.filterGotChosen = this.filterGotChosen.bind(this);
        this.filterGotRemoved = this.filterGotRemoved.bind(this);
    }

    componentDidMount() {
        fetch(`${indikatorURL}`, getMethod)
        .then(response => response.json())
        .then(result => {
            this.setState({
                indikatorer: result.sort()
            });
            
            var tmpArr = [];
            
            var regions = regionInfo.map(item => {
                return item.name;
            })

            this.createRef("Kommune");
            tmpArr.push(<FilterDropdown key='kommune' ref={this.getRef('Kommune')} updateSidebar={this.filterGotChosen} title='Kommune' values={regions}/>);

            this.createRef("År");
            tmpArr.push(<FilterDropdown key='år' ref={this.getRef('År')} updateSidebar={this.filterGotChosen} title='År' values={validYears}/>);

            this.createRef("Indikator");
            tmpArr.push(<FilterDropdown key='indikator' searchAble ref={this.getRef('Indikator')} updateSidebar={this.filterGotChosen} title='Indikator' values={this.state.indikatorer}/>);

            this.setState({filterDropdowns: tmpArr})
        })
   
    }

    getRef(id) {
        return this.state.references[id];
    }

    createRef(id) {
        var tmpRef = this.state.references;
        tmpRef[id] = React.createRef();
        this.setState({references: tmpRef});
    }

    filterGotChosen(groupName, filterName, checked) {
        if (checked) {
            console.log('Filter ' + filterName + ' in group ' + groupName + ' got checked');
            
            if (groupName === 'Kommune') {
                var regionInfoObj = regionInfo.find(r => r.name === filterName);

                this.props.addActiveFilters(groupName, regionInfoObj.code);
            } else {
                this.props.addActiveFilters(groupName, filterName);
            }
            
        } else {
            console.log('Filter ' + filterName + ' in group ' + groupName + ' got unchecked');
            this.props.removeActiveFilters(groupName, filterName);
        }
    }

    filterGotRemoved(filterGroupName, filterName) {
        console.log('filterGotRemoved')
        this.state.references[filterGroupName].current.updateCheckbox(filterName);
        this.props.removeActiveFilters(groupName, filterName, checked);
    }

    disableCheckboxes(groupName, checkboxName) {
        const { references } = this.state;

        references[groupName].current.disableAllButOne(groupName, checkboxName);
    }

    removeDisabling(groupName) {
        const { references } = this.state;

        references[groupName].current.removeDisabling();
    }

    render() {
        const { classes } = this.props;
        return (
                <Box className={classes.root}>
                    <Button 
                        className={classes.addFigureButton} 
                        onClick={this.props.createFigureBox}
                        p={0}
                    >
                        <Plus className='button'/>Generer figur
                    </Button>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        {this.state.filterDropdowns}
                    </Drawer>
            </Box>
        )
    }
}

export default withStyles(styles)(Sidebar)