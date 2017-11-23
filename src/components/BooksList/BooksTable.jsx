import React from "react"
import ReactTable from "react-table"
import ButtonConfirm from "../Buttons/ButtonConfirm"
import StarsRating from "../Misc/StarsRating"

export default class BooksTable extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    render() {
        const columns = [{
            Header: "L.p.",
            accessor: "lp",
            Cell: row => (
                row.viewIndex
            )
        }, {
            Header: "Tytuł",
            accessor: "title"
        }, {
            Header: "Autor",
            accessor: "author"
        }, {
            Header: "Ocena",
            accessor: "rating",
            Cell: row => (
                <StarsRating/>
            )
        }, {
            Header: "Opis",
            accessor: "description"
        }, {
            Header: "Akcje",
            accessor: "actions",
            sortable: false,
            filterable: false,
            Cell: row => (
                <div>
                    <button onClick={() => this.props.editBook(row.row)}>Edytuj</button>
                    <ButtonConfirm message={`Czy na pewno chcesz usunąć książkę "${row.row.title}"`} onClick={() => this.props.deleteBook(row.row)}>Usuń</ButtonConfirm>
                </div>
            )
        }]

        return (
            <ReactTable
                data={this.props.data}
                columns={columns}

                filterable={true}
                defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id
                    return row[id] !== undefined ? String(row[id]).toUpperCase().includes(filter.value.toUpperCase()) : true
                }}

                className="-striped -highlight"

                style={{
                    height: "625px"
                }}
            />
        )
    }
}