import React from "react"
import { remote } from "electron"

export default class ButtonConfirm extends React.Component {
    constructor(props) {
        super(props)

        this.handleChoose = this.handleChoose.bind(this)
    }

    handleChoose() {
        remote.dialog.showMessageBox({
            title: "Uwaga",
            type: "warning",
            buttons: ["Potwierdź", "Anuluj"],
            message: this.props.message,
            cancelId: 1
        }, (response) => {
            if(response === 0) {
                this.props.onClick()
            }
        })
    }

    render() {
        return (
            <button onClick={this.handleChoose}>{this.props.children}</button>
        )
    }
}