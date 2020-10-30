import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
import Graph from "../../components/graph/graph"
import Plot from 'react-plotly.js';
import './stock.css'
import up from './up.png'
import down from './down.png'
import pin from './pin.png'


const Stock = ({ ticker, time, handleName }) => {
    const [stock, setStock] = useState({
        stockChartX: [],
        stockChartY: [],
        symbol: ticker,
        diff: '',
        curr: '',
        diffperc: '',
        sign: ''
    })
    const [detail, setDetail] = useState({
        company: '',
        exc: '',
        curr: ''
    })
   

    useEffect(() => {
        fetchAPI(ticker,time);
        const API = 'CDUD0KP1O9WAG6CO';
        let API_CALL1 = `https://www.alphavantage.co/query?function=OVERVIEW&apikey=${API}&symbol=${ticker}`;
        fetch(API_CALL1)
            .then(response => response.json())
            .then(data => {
                setDetail({
                    company: data['Name'],
                    exc: data['Exchange'],
                    curr: data['Currency'],
                })
                            
        })
        handleName(detail.company);
    }, [ticker,time]);



        
    const Add = async() => {
        let symb = stock.symbol;
        let user = localStorage.getItem("user-id");
        const pi = await fetch('http://localhost:3000/pinStock', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                symbol: symb,
                user: user
            })
        })
            const pinn = await pi.json();
            console.log(pinn);
    }

    const fetchAPI = (symbol,a) => {
        if(a==="Daily") {
            const APIkey = 'CDUD0KP1O9WAG6CO';
            let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${APIkey}&symbol=${ticker}`;
            
            let stockX = [];
            let stockY = [];
            let diff;
            let diffperc;
            let price;
            let companyInfo;
            let exchange;
            let col;
            let icon;
    
            fetch(API_CALL)
                .then(response => response.json())
                .then(data => {
                    for (var key in data['Time Series (Daily)']) {
                        stockX.push(key);
                        stockY.push(data['Time Series (Daily)'][key]['4. close']);
                      
                    }
                    setStock({
                        stockChartX: stockX,
                        stockChartY: stockY,
                        symbol: symbol,
                        price: parseFloat(stockY[0]).toFixed(2),
                        diff: Math.abs(stockY[0]-stockY[1]).toFixed(2),
                        sign: stockY[0]-stockY[1]>0 ? '+' : '-',
                        diffperc: Math.abs((((stockY[0]-stockY[1])/stockY[1])*100).toFixed(2)),
                        col: stockY[0]-stockY[1]>=0 ? "green" : "red",
                        icon: stockY[0]-stockY[1]>=0 ? up : down,
                    });    
                })
        } else if(a==="Intraday") {
            const APIkey = 'CDUD0KP1O9WAG6CO';
            let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=30min&apikey=${APIkey}&symbol=${ticker}`;
            
            let stockX = [];
            let stockY = [];
            let diff;
            let diffperc;
            let price;
            let companyInfo;
            let exchange;
            let col;
            let icon;

            fetch(API_CALL)
                .then(response => response.json())
                .then(data => {
                    for (var key in data['Time Series (30min)']) {
                        stockX.push(key);
                        stockY.push(data['Time Series (30min)'][key]['4. close']);
                    
                    }
                    setStock({
                        stockChartX: stockX,
                        stockChartY: stockY,
                        symbol: symbol,
                        price: parseFloat(stockY[0]).toFixed(2),
                        diff: Math.abs(stockY[0]-stockY[1]).toFixed(2),
                        sign: stockY[0]-stockY[1]>0 ? '+' : '-',
                        diffperc: Math.abs((((stockY[0]-stockY[1])/stockY[1])*100).toFixed(2)),
                        col: stockY[0]-stockY[1]>=0 ? "green" : "red",
                        icon: stockY[0]-stockY[1]>=0 ? up : down,
                    });
                
                })


        }
        
    }
    
    
    return (
        <div className="chart">
            <div className="View">
            <div className="SubView">
            <h3 className="Pinner"><button onClick={Add}><img src={pin} height="50px"></img></button></h3>
            </div>
            <div className="SubView1">
            
            <div className="textGroup2">
            <h1>{stock.symbol}</h1>
            <p>{detail.company}</p>
            <p>{detail.exc}</p>
            </div>
            <div className="PriceGroup">
                <h1 className="Price"> {stock.price} {detail.curr}</h1>
                <div className="PriceGroup2">
                <h2 style={{color: stock.col}}>{stock.sign}{stock.diff} ({stock.diffperc}%) <img src={stock.icon} width="30px"></img></h2> 
                
                </div>
                </div>
            </div>

            </div>

            <Plot useResizeHandler={true}
            data={[
              {
                x: stock.stockChartX,
                y: stock.stockChartY,
                type: 'scatter',
                fill: 'tozeroy',
                mode: 'lines+markers',
                marker: {gradient: { type:"vertical",
                                    color: "white",
                                    },
                         color: stock.col
                                },
                        
              }
              
            ]}
            layout={{
                plot_bgcolor:"#ffffff",
                paper_bgcolor:"#ffffff",
                autosize: true,
                xaxis:{
                    zerolinecolor: '#000000',
                    linecolor: '#000000',
                    tickfont: {
                        family: 'Helvetica Neue',
                        size: 14,
                        color: '#000000'
                    }
                    
                },
                yaxis:{
                    autorange: true,
                    zerolinecolor: '#000000',
                    linecolor: '#000000',
                    tickfont: {
                        family: 'Helvetica Neue',
                        size: 14,
                        color: '#000000'
                    }
                }
            }}
          />  

          <div className="cardGroupMain">
            
          </div>
          </div>
        
        );
}

export default Stock;

