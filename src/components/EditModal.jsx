import React from "react"
import Modal from "react-modal"

export default class EditModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.handleChange = this.handleChange.bind(this)
        this.afterModalOpen = this.afterModalOpen.bind(this)
    }

    afterModalOpen() {
        let newState = {}

        let values = this.props.values

        Object.keys(values.existing).forEach( key => {
            newState[key] = values.existing[key]
        })

        this.setState(newState)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.afterModalOpen}
            >
                <h2>{this.props.contentLabel}</h2>
                    
                <form onSubmit={() => this.props.onSubmit(this.state)}>
                    {this.props.values.toChange.map( (value, index) => {
                        return (
                            <label key={index}>
                                {value.header}
                                <input name={value.accessor} type="text" onChange={this.handleChange} value={this.state[value.accessor]}/>
                            </label>
                        )
                    })}

                    <input type="submit" value="Edytuj"/>
                </form>

                <button onClick={this.props.closeModal}>Anuluj</button>
            </Modal>
        )
    }
}