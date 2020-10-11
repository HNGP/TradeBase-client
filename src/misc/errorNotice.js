import React from 'react'
import './errorNotice.css'

export default function errorNotice(props) {
    return (
        <div className="error-notice">
            <span>{props.message}</span>
            <button onClick={props.clearError}>X</button>
        </div>
    )
}
