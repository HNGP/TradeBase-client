import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import './newsCard.css'

// SAMPLE API RESPONSE FOR JSON REF = http://newsapi.org/v2/everything?q=Netflix&apiKey=b605c07e7c444457a1b10d45f41beeb5&pageSize=5
const News = props => {

    const [newsCard, getNews] = useState({
        headline: '',
        body: '',
        image: '',
        site:''
    });

    const history = useHistory();

    // const newsSite = (site) => {
    //     window.location.href = {site};
    // };
    
    useEffect(()=>{
        fetchApi(props.ticker);
    },[props.ticker]);

    const fetchApi = (ticker) => {
        const APIkey = 'b605c07e7c444457a1b10d45f41beeb5';
        let API_CALL = `http://newsapi.org/v2/everything?q=${props.ticker}&apiKey=${APIkey}&domains=`;
        // let API_CALL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey=${APIkey}&symbol=${props.title}`;
    //    console.log("index"+ )
        fetch(API_CALL)
            .then(response => response.json())
            .then(data => {
                // for (var key in data['articles']) {
                    // stockX.push(key);
                    // stockY.push(data['Time Series (Daily)'][key]['4. close']);
                    getNews({
                        headline: data['articles'][props.index]['title'],
                        body: data['articles'][props.index]['description'],
                        image: data['articles'][props.index]['urlToImage'],
                        site: data['articles'][props.index]['url']
                    });

                // }
               
            
         })

    }

    return (
    <div className="Card" style = {{backgroundImage: `url(${newsCard.image})` }}>
        <a href={newsCard.site} target="_blank"><h2>{newsCard.headline.slice(0, 101)}</h2></a>
        
    </div>
    );
}

export default News;