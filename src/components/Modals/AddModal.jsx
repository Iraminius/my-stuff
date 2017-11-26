import React from "react"
import Modal from "react-modal"

export default class AddModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
        this.submitForm = this.submitForm.bind(this)
        this.selectWholeText = this.selectWholeText.bind(this)
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
                style={{
                    overlay: {
                        zIndex: "2"
                    },
                    content: { 
                        backgroundColor: "#ececec",
                        width: "30vw",
                        textAlign: "center",
                        left: "35vw",
                        height: "50vh",
                        border: "0.1em solid #222222"
                    }
                }}
            >
                <h2>{this.props.contentLabel}</h2>
                    
                <form onSubmit={this.submitForm}>
                    {this.props.values.toChange.map( (value, index) => {
                        return (
                            <div key={index}>
                                <label>
                                    <h3 style={{display: "inline-block", marginRight: "0.5em"}}>{value.header}</h3>
                                    <input name={value.accessor} type="text" onClick={this.selectWholeText} onChange={this.handleChange} value={this.state[value.accessor]}/>
                                </label>
                            </div>
                        )
                    })}

                    <br />
                    <input type="submit" value="Dodaj" className="my-stuff-inner-button"/>
                    <button onClick={this.props.closeModal} className="my-stuff-inner-button">Anuluj</button>
                </form>
            </Modal>
        )
    }
}