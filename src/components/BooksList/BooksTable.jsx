import React from "react"
import ReactTable from "react-table"

export default class BooksTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const columns = [{
            Header: "ID",
            accessor: "_id"
        }, {
            Header: "Tytuł",
            accessor: "title"
        }, {
            Header: "Autor",
            accessor: "author"
        }, {
            Header: "Ocena",
            accessor: "rating"
        }, {
            Header: "Opis",
            accessor: "description"
        }, {
            Header: "Akcje",
            accessor: "actions",
            Cell: row => (
                <div>
                    <button onClick={() => this.props.editBook(row.row)}>Edytuj</button>
                    <button onClick={() => this.props.deleteBook(row.row)}>Usuń</button>
                </div>
            )
        }]

        return (
            <ReactTable
                data={this.props.data}
                columns={columns}
                showPaginationBottom={true}
                filterable={true}
                defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id
                    return row[id] !== undefined ? String(row[id]).toUpperCase().includes(filter.value.toUpperCase()) : true
                }}
            />
        )
    }
}