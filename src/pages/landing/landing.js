import React, { useState, useEffect } from 'react'
import Card from '../../components/card/card'
import './landing.css'

export default function Landing() {

    const [title, setTitle] = useState();
    useEffect(()=>{
        fetchPin();

    }, []);

    const fetchPin = async() => {
        let user = localStorage.getItem("user-id");
        let token = localStorage.getItem("auth-token");
        if(user) {
            const pins = await fetch(`http://localhost:3000/getStock/${user}`, {
            method: 'get',
            headers: {'x-auth-token': token },
            });
            const pin = await pins.json();
            var cards = pin.map(item => {
                return <Card title={item.symbol} key={item._id} text="160.54USD" text2="-0.32(2.3%)"/>;
            });
            setTitle(cards);
        }   
    }

    return (
        <div className = "content">

        <div className="CardGroupMain">
            {title}
            
        </div>
        </div>
    )
}
