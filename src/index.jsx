import React from "react"
import ReactDOM from "react-dom"
import ReactTable from "react-table"
import PouchDB from "pouchdb"

import "react-table/react-table.css"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        let db = new PouchDB("books")
        
        // db.bulkDocs([{
        //     "title": "Krzyżacy",
        //     "author": "Henryk Sienkiewicz"
        // }, {
        //     "title": "Dziady",
        //     "author": "Adam Mickiewicz"
        // }]).then( result => {
        //     console.log(result)
        // })
        
        db.allDocs({
            include_docs: true
        }).then( result => {
            let docs = result.rows.map( row => {
                return row.doc
            })

            this.setState({data: docs})
        })     
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
        }] 
        
        return (
            <ReactTable
                data={this.state.data}
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
 
ReactDOM.render(<App />, document.body)