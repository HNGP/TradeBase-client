import React, { useContext, useState } from 'react'
import Stock from '../../components/stock/stock'
import Card from '../../components/card/card'
import News from '../../components/NewsCard/newsCard'
import SearchBar from '../../components/searchBar/searchBar'
import UserContext from '../../context/userContext'

import './stockPage.css'



export default function Stockpage() {
    const { userData, setUserData } = useContext(UserContext);
    const [ticker, setTicker] = useState("AAPL");
    const [time, setTime] = useState("Intraday");
    const [name, setName] = useState("Apple Inc");
    const [index, setIndex] = useState("4");
   
    const handleSearch = (ticker) => {
        setTicker(ticker);
  };
  const handleName = (input) => {
    setName(input);
};


    return (
    <div>
    { userData.user ? (
        <div className="Content">
            <div className="jumbotron">
           <SearchBar handleSearch={handleSearch} />
            <button onClick={() => {setTime("Daily")}}>Daily</button>
            <button onClick={() => {setTime("Intraday")}}>Intraday</button>
           
            <Stock ticker={ticker} time={time} handleName={handleName}/>
            </div>

            <h1 className="NewsH1">Relevant news:</h1>
            <div className="CardGroup">
                <News ticker={ticker} index={0} > </News>
                <News ticker={ticker} index={1}> </News>
                <News ticker={ticker} index={2}> </News>
                <News ticker={ticker} index={3}> </News> 
                <News ticker={ticker} index={4}> </News> 
                <News ticker={ticker} index={5}> </News> 
                </div>
        </div> 
    ) : (
            <h3>Please Login/Register to view</h3>
    )}
    </div>
    );
}
