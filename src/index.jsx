import React from "react"
import ReactDOM from "react-dom"
import ReactTable from "react-table"
import PouchDB from "pouchdb"
import AddModal from "./components/AddModal"
import EditModal from "./components/EditModal"

import "react-table/react-table.css"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.db = new PouchDB("books")

        this.state = {
            addModalOpen: false,
            editModalOpen: false,
            neededForEdit: {},
            data: []
        }

        this.fetchData = this.fetchData.bind(this)

        this.openAddModal = this.openAddModal.bind(this)
        this.closeAddModal = this.closeAddModal.bind(this)
        this.submitAddModal = this.submitAddModal.bind(this)

        this.editBook = this.editBook.bind(this)
        this.closeEditModal = this.closeEditModal.bind(this)
        this.submitEditModal = this.submitEditModal.bind(this)
    }

    componentDidMount() {        
        this.fetchData()
    }

    fetchData() {
        this.db.allDocs({
            include_docs: true
        }).then( result => {
            let docs = result.rows.map( row => {
                return row.doc
            })

            this.setState({data: docs})
        })     
    }

    openAddModal() {
        this.setState({
            addModalOpen: true
        })
    }

    closeAddModal() {
        this.setState({
            addModalOpen: false
        })
    }

    submitAddModal(data) {
        this.db.bulkDocs([data])
            .then( result => {
                this.fetchData()
            }).catch( error => {
                console.log(error)
            })
    }

    editBook(row) {
        this.setState({
            editModalOpen: true,
            neededForEdit: {
                _id: row._id,
                _rev: row._original._rev,
                title: row.title,
                author: row.author
            }
        })
    }

    closeEditModal() {
        this.setState({
            editModalOpen: false
        })
    }

    submitEditModal(data) {
        this.db.bulkDocs([data])
            .then( result => {
                this.fetchData()
            }).catch( error => {
                console.log(error)
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
        }, {
            Header: "Akcje",
            accessor: "actions",
            Cell: row => (
                <div>
                    <button onClick={() => this.editBook(row.row)}>Edytuj</button>    
                </div>
            )
        }]
        
        return (
            <div>
                <AddModal
                    isOpen={this.state.addModalOpen}
                    contentLabel="Dodaj książkę"
                    onSubmit={this.submitAddModal}
                    closeModal={this.closeAddModal}
                    values={{
                        toChange: [{
                            header: "Tytuł",
                            accessor: "title"
                        }, {
                            header: "Autor",
                            accessor: "author"
                        }]
                    }}
                />

                <EditModal
                    isOpen={this.state.editModalOpen}
                    contentLabel="Edytuj książkę"
                    onSubmit={this.submitEditModal}
                    closeModal={this.closeEditModal}
                    values={{
                        existing: this.state.neededForEdit,
                        toChange: [{
                            header: "Tytuł",
                            accessor: "title"
                        }, {
                            header: "Autor",
                            accessor: "author"
                        }]
                    }}
                />

                <button onClick={this.openAddModal}>Dodaj książkę</button>

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
            </div>
        )
    }
}
 
ReactDOM.render(<App />, document.body)