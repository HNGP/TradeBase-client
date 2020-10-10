import React from 'react'
import './card.css'

const Card = props => (
    <div className="Card">
        <h1>{props.title}</h1>
        <h2>{props.text}</h2>
        <h3>{props.text2}</h3>

    </div>
)

export default Card