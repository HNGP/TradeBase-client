import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../../context/userContext'
import './about.css'
import Card from '../../components/card/card'



const About = () => {

return(
    <div className="content-hero">
    
        <h1>About Us</h1>
       
        <p>
        The stock market can be a very complicated place for people new to finance, who are looking to invest. Trading, IPOs, keeping up with stocks can be very confusing for users who are not seasoned with investing.
        TradeBase is a web app which tracks stocks you’ve invested in, gives you notifications through the browser when they rise or drop and also gives you new opportunities to trade. Stock data is updated in realtime, in a time series and represented on a histogram.
        You can pin stocks into the homepage and watch them constantly, and search for new stocks, all with a very clean, intuitive UI and UX, which is adaptive and responsive regardless of what type of device you use. 
        </p>
        <br></br>
        Built using MERN Stack: MongoDB, Express, React, Node
        
        <br></br>
        <h3> Developed by: </h3>
        <div className="cardgrp">
            <div className="card">
            <h1>Kaustubh Debnath </h1>
            19BCE1445
            <h2>Contributions: UI Design, Components, News Cards</h2>
            </div>
            <div className="card">
            <h1>S C Ashwin </h1>
            19BCE1809
            <h2>Contributions: Backend Engineering, Database, Auth</h2>
            </div>
        </div>
    </div>

   
   );
}

export default About
