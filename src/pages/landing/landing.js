import React, { useState, useEffect, useContext } from 'react'
import Card from '../../components/card/card'
import { useHistory } from "react-router-dom";
import UserContext from '../../context/userContext'
import './landing.css'
import bg from './bg.png'

export default function Landing() {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const login = () => history.push("/login");
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
    <div> 
    { userData.user ? (
        <div className = "content-hero">
            <h1>Your Watchlist</h1>
        <div className="CardGroupMain">
            {title}
            
        </div>
        </div>
     ) : (
        <div className = "content-bg">
            <h2 classname="prebrand">welcome to </h2> 
            <h1 className="brand">tradebase.</h1>
            <p>
                Tradebase let's you search and monitor thousands of stocks, explore news, and pin them to your watchlist with ease and a intuitive, fluid  user interface.
                <br></br><br></br>Catching up with Wall Street hasn't been simpler.
            </p>
            <button onClick={login}>LOG IN TO CONTINUE</button>
            
            
            
            <svg width="100%" height="768" viewBox="0 0 768" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="url(#paint0_linear)">
            {/* <path d="M-46.0006 951.16L-46.2515 960.716M-215.482 579.431C-149.094 454.575 -99.3499 443.622 -66.2499 546.571C-20.6917 695.608 29.0522 684.655 82.9818 513.711C139.115 342.283 188.859 331.33 232.214 480.852C294.134 703.23 343.878 692.277 381.445 447.992C421.419 203.177 471.163 192.224 530.677 415.132C568.82 550.265 618.564 539.311 679.909 382.272C739.305 225.662 789.049 214.709 829.14 349.412C896.747 590.515 946.491 579.561 978.372 316.553C1014.15 52.6855 1063.89 41.7322 1127.6 283.693C1174.68 456.811 1224.42 445.858 1276.84 250.833C1327.84 56.1186 1377.59 45.1653 1426.07 217.973C1487.36 441.97 1537.1 431.017 1575.3 185.113L1540.51 759.954L-221.312 801.5L-215.482 579.431Z" stroke="white" stroke-width="2"/> */}
            <animate repeatCount="indefinite" attributeName="d" fill="blue" dur="10s" values="
            M-66.2499 546.571C-99.3499 443.622 -149.094 454.575 -215.482 579.431L-221.312 801.5L1540.51 759.954L1575.3 185.113C1537.1 431.017 1487.36 441.97 1426.07 217.973C1377.59 45.1653 1327.84 56.1186 1276.84 250.833C1224.42 445.858 1174.68 456.811 1127.6 283.693C1063.89 41.7322 1014.15 52.6855 978.372 316.553C946.491 579.561 896.747 590.515 829.14 349.412C789.049 214.709 739.305 225.662 679.909 382.272C618.564 539.311 568.82 550.265 530.677 415.132C471.163 192.224 421.419 203.177 381.445 447.992C343.878 692.277 294.134 703.23 232.214 480.852C188.859 331.33 139.115 342.283 82.9818 513.711C29.0522 684.654 -20.6917 695.608 -66.2499 546.571Z; 
            M-66.25 679.571C-99.3499 576.621 -149.094 587.575 -215.482 712.431L-221.312 934.5L1540.51 892.954L1575.3 318.113C1537.1 564.017 1487.36 574.97 1426.07 350.973C1377.59 178.165 1349.01 -28.7144 1298 166C1245.59 361.025 1195.84 371.978 1148.77 198.86C1085.06 -43.1008 1014.15 21.3863 978.372 285.253C946.491 548.262 896.747 559.216 829.14 318.113C789.048 183.41 739.305 358.662 679.909 515.272C618.564 672.311 568.82 683.264 530.677 548.132C471.163 325.223 458.706 237.598 418.732 482.412C381.164 726.697 331.42 737.651 269.5 515.272C226.145 365.75 139.115 475.283 82.9818 646.711C29.0522 817.654 -20.6917 828.608 -66.25 679.571Z;
            M-66.2499 546.571C-99.3499 443.622 -149.094 454.575 -215.482 579.431L-221.312 801.5L1540.51 759.954L1575.3 185.113C1537.1 431.017 1487.36 441.97 1426.07 217.973C1377.59 45.1653 1327.84 56.1186 1276.84 250.833C1224.42 445.858 1174.68 456.811 1127.6 283.693C1063.89 41.7322 1014.15 52.6855 978.372 316.553C946.491 579.561 896.747 590.515 829.14 349.412C789.049 214.709 739.305 225.662 679.909 382.272C618.564 539.311 568.82 550.265 530.677 415.132C471.163 192.224 421.419 203.177 381.445 447.992C343.878 692.277 294.134 703.23 232.214 480.852C188.859 331.33 139.115 342.283 82.9818 513.711C29.0522 684.654 -20.6917 695.608 -66.2499 546.571Z " />
            </path>
            <defs>
            <linearGradient id="paint0_linear" x1="613.489" y1="204.906" x2="772.924" y2="928.972" gradientUnits="userSpaceOnUse">
            <stop stop-color="#1552F0"/>
            <stop offset="1" stop-color="white" stop-opacity="0"/>
            </linearGradient>
            </defs>
            </svg>
            





      
        </div>
        )}

    </div>
    );
    
}
