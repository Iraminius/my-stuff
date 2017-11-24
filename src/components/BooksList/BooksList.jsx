import React from "react"
import PouchDB from "pouchdb-browser"
import AddModal from "../Modals/AddModal"
import EditModal from "../Modals/EditModal"
import BooksTable from "./BooksTable"
import ButtonConfirm from "../Buttons/ButtonConfirm"
import { remote } from "electron"

import "./booksList.less"

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
        this.submitModal = this.submitModal.bind(this)
        this.submitAddModal = this.submitAddModal.bind(this)
        this.editBook = this.editBook.bind(this)
        this.deleteBook = this.deleteBook.bind(this)
        this.submitEdit = this.submitEdit.bind(this)

        this.warningPrompt = this.warningPrompt.bind(this)
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

    warningPrompt(message, onAccept) {
        remote.dialog.showMessageBox({
            title: "Uwaga",
            type: "warning",
            buttons: ["Potwierdź", "Anuluj"],
            message: message,
            cancelId: 1
        }, (response) => {
            if(response === 0) {
                onAccept()
            }
        })
    }

    submitAddModal(data) {
        data.rating = 0

        let exists = false
        this.state.data.forEach( document => {
            if(document.title === data.title) {
                exists = true
            }
        })

        if(exists) {
            this.warningPrompt(`Podana książka już istnieje: "${data.title}". Czy na pewno chcesz ją dodać?`, () => {this.submitModal(data)})
        } else {
            this.submitModal(data)
        }
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

    submitEdit(data) {
        console.log(data)
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
                _id: row._original._id,
                _rev: row._original._rev,
                title: row.title,
                author: row.author,
                rating: row.rating
            }
        })
    }

    deleteBook(row) {
        row._id = row._original._id
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
            <main>
                <AddModal
                    isOpen={this.state.addModalOpen}
                    contentLabel="Dodaj książkę"
                    onSubmit={this.submitAddModal}
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
                    onSubmit={this.submitEdit}
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

                <button className="my-stuff-outer-button" onClick={() => {this.toggleModal("addModalOpen")}}>
                    <i class="fa fa-plus" aria-hidden="true"></i> Dodaj książkę
                </button>

                <BooksTable
                    data={this.state.data}
                    editBook={this.editBook}
                    deleteBook={this.deleteBook}
                    submitEdit={this.submitEdit}
                />
            </main>
        )
    }
}