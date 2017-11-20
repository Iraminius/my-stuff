import React from "react"
import ReactDOM from "react-dom"
import BooksList from "./components/BooksList/BooksList"

import "react-table/react-table.css"

class App extends React.Component {
    render() {
        return <BooksList/>
    }
}
 
ReactDOM.render(<App/>, document.getElementById("root"))