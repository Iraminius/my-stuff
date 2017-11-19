import React from "react"
import ReactDOM from "react-dom"
import ReactTable from "react-table"
import PouchDB from "pouchdb"
import Modal from "react-modal"

import "react-table/react-table.css"

class App extends React.Component {
    constructor(props) {
        super(props)

        this.db = new PouchDB("books")

        this.state = {
            title: "",
            author: "",
            modalIsOpen: false,
            data: []
        }

        this.fetchData = this.fetchData.bind(this)

        this.openModal = this.openModal.bind(this)
        this.afterModalOpen = this.afterModalOpen.bind(this)
        this.closeModal = this.closeModal.bind(this)

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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

    openModal() {
        this.setState({modalIsOpen: true})
    }

    afterModalOpen() {
        this.setState({
            title: "",
            author: ""
        })
    }
    
    closeModal() {
        this.setState({modalIsOpen: false})
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit() {
        this.db.bulkDocs([{
            "title": this.state.title,
            "author": this.state.author
        }]).then( result => {
            this.fetchData()
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
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Dodaj książkę"
                >
                    <h2>Nowa książka</h2>
                    
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Tytuł:
                            <input name="title" type="text" onChange={this.handleChange} value={this.state.title}/>
                        </label>
                        <label>
                            Autor:
                            <input name="author" type="text" onChange={this.handleChange} value={this.state.author}/>
                        </label>
                        <input type="submit" value="Dodaj"/>
                    </form>

                    <button onClick={this.closeModal}>Anuluj</button>
                </Modal>

                <button onClick={this.openModal}>Dodaj książkę</button>

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

            // onclick add open modal, fill the gaps and insert to db
            </div>
        )
    }
}
 
ReactDOM.render(<App />, document.body)