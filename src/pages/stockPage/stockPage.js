import React, { useContext } from 'react'
import Stock from '../../components/stock/stock'
import Card from '../../components/card/card'
import UserContext from '../../context/userContext'
import './stockPage.css'

export default function Stockpage() {
    const { userData, setUserData } = useContext(UserContext);
    return (
    <div>
    { userData.user ? (
        <div className="Content">
            <div className="jumbotron">
                <Stock/>
            </div>
        </div> 
    ) : (
        <div>
            <h3>Please Login/Register to view</h3>
        </div>  
    )}
    </div>
    );
}
