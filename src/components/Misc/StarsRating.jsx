import React from "react"

export default class StarsRating extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0
        }
    }

    render() {
        return (
            <div>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star-half-o" aria-hidden="true"></i>
                <i class="fa fa-star-o" aria-hidden="true"></i>
            </div>
        )
    }
}