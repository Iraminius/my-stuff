import React from "react"

import "./starsRating.less"

export default class StarsRating extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: this.props.data.rating
        }

        this.submit = this.submit.bind(this)
        this.handleRating = this.handleRating.bind(this)
    }

    submit() {
        let data = {
            title: this.props.data.title,
            author: this.props.data.author,
            rating: this.state.rating,
            _id: this.props.data._original._id,
            _rev: this.props.data._original._rev
        }

        this.props.onSubmit(data)
    }

    handleRating(value) {
        this.setState({
            rating: value
        })
    }

    render() {
        return (
            <div onMouseLeave={() => this.handleRating(this.props.data.rating)}>
                {Array.apply(null, Array(this.state.rating)).map( (element, index) => {
                    return (
                        <span key={index} className="fa-stack fa" onMouseEnter={() => this.handleRating(index + 1)} onClick={this.submit}>
                            <i className="fa fa-star fa-stack-1x"></i>
                            <i className="fa fa-star-o fa-stack-1x"></i>
                        </span>
                    )
                })}
                {Array.apply(null, Array(10 - (this.state.rating))).map( (element, index) => {
                    return (
                        <span key={index} className="fa-stack fa" onMouseEnter={() => this.handleRating(index + (this.state.rating) + 1)}>
                            <i className="fa fa-star-o fa-stack-1x"></i>
                        </span>
                    )
                })}
            </div>
        )
    }
}