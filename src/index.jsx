import React from "react"
import ReactDOM from "react-dom"
import BooksList from "./components/BooksList/BooksList"

import "react-table/react-table.css"
import "font-awesome/css/font-awesome.css"
import "./main.less"
import "./res/fonts/roboto.ttf"

class App extends React.Component {
    render() {
        return <BooksList/>
    }
}
 
ReactDOM.render(<App/>, document.getElementById("root"))