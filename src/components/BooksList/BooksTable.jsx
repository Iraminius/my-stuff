import React from "react"
import ReactTable from "react-table"
import ButtonConfirm from "../Buttons/ButtonConfirm"
import StarsRating from "../Misc/StarsRating"

import "./booksTable.less"

export default class BooksTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            columns: [{
                Header: "L.p.",
                accessor: "lp",
                minWidth: 50,
                Cell: row => (
                    <p className="rt-id">{row.index + 1}</p>
                )
            }, {
                Header: "Tytuł",
                accessor: "title",
                minWidth: 150
            }, {
                Header: "Autor",
                accessor: "author",
                minWidth: 120
            }, {
                Header: "Ocena",
                accessor: "rating",
                minWidth: 120,
                Cell: row => (
                    <div>
                        <StarsRating data={row.row} onSubmit={this.props.submitEdit}/>
                    </div>
                )
            }, {
                Header: "Akcje",
                accessor: "actions",
                minWidth: 60,
                sortable: false,
                filterable: false,
                Cell: row => (
                    <div>
                        <button className="my-stuff-inner-button" onClick={() => this.props.editBook(row.row)}>Edytuj</button>
                        <ButtonConfirm className="my-stuff-inner-button" message={`Czy na pewno chcesz usunąć książkę "${row.row.title}"`} onClick={() => this.props.deleteBook(row.row)}>Usuń</ButtonConfirm>
                    </div>
                )
            }]
        }
    }

    render() {
        return (
            <ReactTable
                data={this.props.data}
                columns={this.state.columns}

                defaultPageSize={10}

                filterable={true}
                defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id
                    return row[id] !== undefined ? String(row[id]).toUpperCase().includes(filter.value.toUpperCase()) : true
                }}

                className="-striped -highlight"
            />
        )
    }
}