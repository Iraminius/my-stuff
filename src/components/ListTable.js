import React, { Component } from 'react'
import { Paper, Table, TableHead, TableRow, TableCell, TableBody } from 'material-ui'

let id = 0
function createData(name, calories, fat, carbs, protein) {
    id += 1
    return { id, name, calories, fat, carbs, protein }
}

const data = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
]

export default class ListTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>N.p.</TableCell>
                                <TableCell>Tytuł</TableCell>
                                <TableCell>Autor</TableCell>
                                <TableCell>Ocena</TableCell>
                                <TableCell>Akcja</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(n => {
                                return (
                                    <TableRow key={n.id}>
                                        <TableCell>{n.id}</TableCell>
                                        <TableCell>{n.name}</TableCell>
                                        <TableCell>{n.calories}</TableCell>
                                        <TableCell>{n.fat}</TableCell>
                                        <TableCell>{n.carbs}</TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}