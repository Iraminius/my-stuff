import React from "react"
import ReactDOM from "react-dom"
import ReactTable from "react-table"

import "react-table/react-table.css"

class App extends React.Component {
    render() {
        
        const columns = [{
            Header: "L.p.",
            accessor: "id"
        }, {
            Header: "Tytuł",
            accessor: "title"
        }, {
            Header: "Autor",
            accessor: "author"
        }]

        return (
            <ReactTable
                data={data}
                columns={columns}
                
                showPaginationTop={true}
                showPaginationBottom={true}

                filterable={true}
                defaultFilterMethod={(filter, row, column) => {
                    const id = filter.pivotId || filter.id
                    return row[id] !== undefined ? String(row[id]).includes(filter.value) : true
                }}
            />
        )
    }
}
 
ReactDOM.render(<App />, document.body)