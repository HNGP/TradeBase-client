import React, { useState, useEffect } from 'react'
import PropTypes from "prop-types"
import Graph from "../../components/graph/graph"
import Plot from 'react-plotly.js';
import './stock.css'
import searchIcon from './search.png'
import up from './up.png'
import down from './down.png'

const Stock = () => {
    const [stock, setStock] = useState({
        stockChartX: [],
        stockChartY: [],
        symbol: '',
        company: '',
        exc: '',
        diff: '',
        curr: '',
        diffperc: ''
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
                            price: parseFloat(stockY[0]).toFixed(2),
                            diff: (stockY[0]-stockY[1]).toFixed(2),
                            diffperc: Math.abs((((stockY[0]-stockY[1])/stockY[1])*100).toFixed(2)),
                            col: stockY[0]-stockY[1]>=0 ? "green" : "red",
                            icon: stockY[0]-stockY[1]>=0 ? up : down,
                        });
                
                })
            
            })

    }
    return (
        <div className="chart">
            <div className="View">
            <div className="SubView">
            <input class="search" type="text" placeholder="Search for a stock" onChange={(e) => setSearch({sym: e.target.value})}></input>
            <button onClick={Search}><img src={searchIcon} width="30px"></img></button>
            </div>
            <div className="SubView1">
            
            <div className="textGroup2">
            <h1>{stock.symbol}</h1>
            <p>{stock.company}</p>
            <p>{stock.exc}</p>
            </div>
            <div className="PriceGroup">
                <h1 className="Price"> {stock.price} {stock.curr}</h1>
                <div className="PriceGroup2">
                <h2 style={{color: stock.col}}>{stock.diff} ({stock.diffperc}%) <img src={stock.icon} width="30px"></img></h2> 
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
          </div>
        
        );
}

export default Stock;

