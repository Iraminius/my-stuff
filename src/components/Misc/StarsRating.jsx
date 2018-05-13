import React from "react"

import "./starsRating.less"

export default class StarsRating extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            update: false,
            rating: this.props.data.rating
        }

        this.submit = this.submit.bind(this)
        this.handleRating = this.handleRating.bind(this)
    }

    componentDidUpdate() {
        if (this.state.update) {
            this.handleRating(this.props.data.rating)
        }
    }

    componentWillReceiveProps() {
        this.setState({
            update: true
        })
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
            rating: value,
            update: false
        })
    }

    render() {
        return (
            <div onMouseLeave={() => {this.handleRating(this.props.data.rating)}}>
                {Array.apply(null, Array(this.state.rating)).map((element, index) => {
                    return (
                        <span
                            key={index}
                            className="fa-stack fa"
                            onMouseEnter={() => {
                                this.handleRating(index + 1)
                            }}
                            onClick={this.submit}
                        >
                            <i className="fa fa-book fa-stack-1x book"></i>
                        </span>
                    )
                })}
                {Array.apply(null, Array(10 - (this.state.rating))).map((element, index) => {
                    return (
                        <span
                            key={index}
                            className="fa-stack fa"
                            onMouseEnter={() => {
                                this.handleRating(index + (this.state.rating) + 1)
                            }}
                        >
                            <i className="fa fa-book fa-stack-1x book-o"></i>
                        </span>
                    )
                })}
            </div>
        )
    }
}