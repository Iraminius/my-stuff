import React from "react"
import PouchDB from "pouchdb-browser"
import AddModal from "../Modals/AddModal"
import EditModal from "../Modals/EditModal"
import BooksTable from "./BooksTable"

export default class BooksList extends React.Component {
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

        this.toggleModal = this.toggleModal.bind(this)
        this.editBook = this.editBook.bind(this)
        this.submitModal = this.submitModal.bind(this)

        this.deleteBook = this.deleteBook.bind(this)
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

    toggleModal(modalOpenStateName) {
        this.setState({
            [modalOpenStateName]: !this.state[modalOpenStateName]
        })
    }

    submitModal(data) {
        this.db.bulkDocs([data])
            .then( result => {
                this.fetchData()
            })
            .catch( error => {
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

    deleteBook(row) {
        row._rev = row._original._rev
        
        this.db.remove(row)
            .then( result => {
                this.fetchData()
            })
            .catch( error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <AddModal
                    isOpen={this.state.addModalOpen}
                    contentLabel="Dodaj książkę"
                    onSubmit={this.submitModal}
                    closeModal={() => {this.toggleModal("addModalOpen")}}
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
                    onSubmit={this.submitModal}
                    closeModal={() => {this.toggleModal("editModalOpen")}}
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

                <button onClick={() => {this.toggleModal("addModalOpen")}}>Dodaj książkę</button>

                <BooksTable
                    data={this.state.data}
                    editBook={this.editBook}
                    deleteBook={this.deleteBook}
                />
            </div>
        )
    }
}