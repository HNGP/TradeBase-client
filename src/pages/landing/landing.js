import React from 'react'
import Card from '../../components/card/card'
import './landing.css'

export default function Landing() {
    return (
        <div className = "content">

        <div class="CardGroupMain">
            
            <Card title="TSLA" text="160.54USD" text2="-0.32(2.3%)"/>
            <Card title="AAPL" text="160.54USD" text2="-0.32(2.3%)"/>
            <Card title="MSFT" text="160.54USD" text2="-0.32(2.3%)"/>
            <Card title="NFLX" text="160.54USD" text2="-0.32(2.3%)"/>
            
        </div>
        </div>
    )
}
