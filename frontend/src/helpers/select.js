import React, { Component } from 'react'
import { filterMenuItems } from './dropdownContent'

class Select extends Component {
    handleChange = (event) => {
        return this.props.change(event.target.value)
    }

    renderOptions = () => {
        return filterMenuItems.map(x =>
            <option
                key={x.id}
                value={x.value}
            >
                {x.description}
            </option>
        )
    }

    render = () => {
        return <select
            onChange={this.handleChange}
            value={this.props.value}
            className='w-100 mb-2 p-2'
            style={{ color: "#404040" }}
        >
            {this.renderOptions()}
        </select>
    }
}

export default Select
