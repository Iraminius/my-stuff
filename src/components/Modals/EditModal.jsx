import React from "react"
import Modal from "react-modal"

export default class EditModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.afterModalOpen = this.afterModalOpen.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.selectWholeText = this.selectWholeText.bind(this)
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

    submitForm(e) {
        e.preventDefault()
        this.props.onSubmit(this.state)
        this.props.closeModal()
    }

    selectWholeText(e) {
        e.target.setSelectionRange(0, e.target.value.length)
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.afterModalOpen}
            >
                <h2>{this.props.contentLabel}</h2>
                    
                <form onSubmit={this.submitForm}>
                    {this.props.values.toChange.map( (value, index) => {
                        return (
                            <label key={index}>
                                {value.header}
                                <input onClick={this.selectWholeText} name={value.accessor} type="text" onChange={this.handleChange} value={this.state[value.accessor]}/>
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