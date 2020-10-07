import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
import Graph from "../../components/graph/graph"
import Plot from 'react-plotly.js';
import './stock.css'


const Stock = () => {
    const [stock, setStock] = useState({
        stockChartX: [],
        stockChartY: [],
        symbol: '',
        company: '',
        exc: '',
        curr: ''
    })
    const [search, setSearch] = useState({
        sym: undefined
    });

    useEffect(() => {
        fetchAPI('NFLX');
    }, []);
        
    const Search = () => {
        fetchAPI(search.sym);
    }
    const fetchAPI = (symbol) => {
        const APIkey = 'CDUD0KP1O9WAG6CO';
        let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${APIkey}&symbol=${symbol}`;
        let API_CALL1 = `https://www.alphavantage.co/query?function=OVERVIEW&apikey=${APIkey}&symbol=${symbol}`;
        
        let stockX = [];
        let stockY = [];

        let companyInfo;
        let exchange;

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
                            stockChartX: stockX,
                            stockChartY: stockY,
                            symbol: symbol,
                            company: data['Name'],
                            exc: data['Exchange'],
                            curr: data['Currency'],
                        });
                
                })
            
            })

    }
    return (
        <div className="chart">
            <div className="textGroup">
            <input type="text" placeholder="Enter the stock Symbol" onChange={(e) => setSearch({sym: e.target.value})}></input>
            <button onClick={Search}>Search</button>
            <h1>{stock.symbol}</h1>
            <p>{stock.company}</p>
            <p>{stock.exc}</p>
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
                         color: "green"
                                },
                        
              }
              
            ]}
            layout={{
                plot_bgcolor:"#26282E",
                paper_bgcolor:"#26282E",
                autosize: true,
                xaxis:{
                    zerolinecolor: '#ffffff',
                    linecolor: '#ffffff',
                    tickfont: {
                        family: 'Helvetica Neue',
                        size: 14,
                        color: '#ffffff'
                    }
                    
                },
                yaxis:{
                    autorange: true,
                    zerolinecolor: '#ffffff',
                    linecolor: '#ffffff',
                    tickfont: {
                        family: 'Helvetica Neue',
                        size: 14,
                        color: '#ffffff'
                    }
                }
            }}
          />  
          </div>
        
        );
}

export default Stock;

