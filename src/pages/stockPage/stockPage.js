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
    const [index, setIndex] = useState("4");
   
    const handleSearch = (ticker) => {
        setTicker(ticker);
  };


    return (
    <div>
    { userData.user ? (
        <div className="Content">
            <div className="jumbotron">
           <SearchBar handleSearch={handleSearch} />
            {/* <button onClick={Search}><img src={searchIcon} width="30px"></img>GO</button> */}
           
            <Stock ticker={ticker}/>
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
