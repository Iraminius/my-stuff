import React, { Component } from 'react'
import { Grid, Paper } from 'material-ui'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { Link } from 'react-router-dom'

import './ListsMenu.css'

const data = [{
    'typeId': 1,
    'typeName': 'Książki',
    'lists': [{
        'id': 1,
        'name': 'Moje książki'
    }]
}]

export default class ListsMenu extends Component {
    constructor(props) {
        super(props)

        let listsOpen = {}
        data.forEach(listType => {
            listsOpen[listType.typeName] = true
        })

        this.state = { listsOpen }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(typeName) {
        const newState = this.state
        newState.listsOpen[typeName] = !newState.listsOpen[typeName]
        this.setState(newState)
    }

    render() {
        return (
            <Grid container className="lists-container">
                <Grid item xs={12} sm={7} md={7} lg={4}>
                    <List subheader={<div />}>
                        {data.map(listType => (
                            <Paper className="list-paper" key={`section-${listType.typeId}`}>
                                <div>
                                    <ListItem button onClick={() => { this.handleClick(listType.typeName) }} className="list-subheader">
                                        <ListItemText inset primary={listType.typeName} />
                                        {this.state.listsOpen[listType.typeName] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={this.state.listsOpen[listType.typeName]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {listType.lists.map(list => (
                                                <Link to={`/${list.id}`} key={`item-${list.id}`}>
                                                    <ListItem button>
                                                        <ListItemText inset primary={list.name} />
                                                    </ListItem>
                                                </Link>
                                            ))}
                                        </List>
                                    </Collapse>
                                </div>
                            </Paper>
                        ))}
                    </List>
                </Grid>
            </Grid>
        )
    }
}