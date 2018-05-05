import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'material-ui'
import ListTable from '../components/ListTable'

export default class List extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Button variant="raised">Dodaj książkę</Button>
                <br />
                <hr />
                <ListTable />
            </div>
        )
    }
}

List.propTypes = {
    match: PropTypes.object.isRequired
}