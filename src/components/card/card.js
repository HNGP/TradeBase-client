import React, {useState, useEffect} from 'react'
import './card.css'

const Card = props => {

    const [stock, setStock] = useState({
        title: '',
        curr: '',
        price: '',
        diff: '',
        sign: '',
        diffperc: '',
        col: '',
    });
    
    useEffect(()=>{
        fetchApi(props.title);
    },[]);

    const fetchApi = (title) => {
        const APIkey = 'CDUD0KP1O9WAG6CO';
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${APIkey}&symbol=${title}`;
        let API_CALL1 = `https://www.alphavantage.co/query?function=OVERVIEW&apikey=${APIkey}&symbol=${title}`;
        let stockX = [];
        let stockY = [];

        fetch(API_CALL)
            .then(response => response.json())
            .then(data => {
                for (var key in data['Time Series (Daily)']) {
                    stockX.push(key);
                    stockY.push(data['Time Series (Daily)'][key]['4. close']);
                  
                }
                fetch(API_CALL1)
                    .then(response => response.json())
                    .then(data => {
                        setStock({
                            title: props.title,
                            curr: data['Currency'],
                            price: parseFloat(stockY[0]).toFixed(2),
                            diff: Math.abs(stockY[0]-stockY[1]).toFixed(2),
                            sign: stockY[0]-stockY[1]>0 ? '+' : '-',
                            diffperc: Math.abs((((stockY[0]-stockY[1])/stockY[1])*100).toFixed(2)),
                            col: stockY[0]-stockY[1]>=0 ? "green" : "red",
                        });
                
                })
            
            })

    }

    return (
    <div className="Card">
        <h1>{stock.title}</h1>
        <h2>{stock.price}{stock.curr}</h2>
        <h3 style={{color: stock.col}}>{stock.sign}{stock.diff}({stock.diffperc})</h3>

    </div>
    );
}


export default Card