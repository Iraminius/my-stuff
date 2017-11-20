import React from "react"
import Modal from "react-modal"

export default class AddModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
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
                                <input name={value.accessor} type="text" onChange={this.handleChange} value={this.state[value.accessor]}/>
                            </label>
                        )
                    })}

                    <input type="submit" value="Dodaj"/>
                </form>

                <button onClick={this.props.closeModal}>Anuluj</button>
            </Modal>
        )
    }
}