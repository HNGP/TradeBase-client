import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../../context/userContext'
import './header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState({
    hasScrolled: false,
  });
  
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const home = () => history.push("/");
  const stock = () => history.push("/stockPage");
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const about = () => history.push("/about");
  const logout = () => {
    history.push("/");
    setUserData({
      token: undefined,
      user: undefined,
    })
    localStorage.setItem("auth-token", "");
    localStorage.setItem("user-id", "");
  }

  const handleScroll = (event) => {
    const scrollTop = window.pageYOffset
 
    if (scrollTop > 50) {
      setScrolled({hasScrolled: true})
    } else {
      setScrolled({hasScrolled: false})
    }
    
    }
  
  useEffect(() =>{
    window.addEventListener('scroll', handleScroll)
  }, []);
  
  return(
    <div className={scrolled.hasScrolled? 'Header HeaderScrolled' : 'Header'}>
      <div className="HeaderGroup">
        <h2 onClick={home}>tradebase</h2>
        {userData.token ? (
        <div className="HeaderGroup2">
          <a onClick={about}>About</a>
          <a onClick={stock}>Stocks</a>
          <a onClick={logout}>Logout</a>
          </div>):(
        <div className="HeaderGroup2">
          <a onClick={about}>About</a>
          <a onClick={register}>Register</a>
          <a onClick={login}>Login</a>
        </div>
        )}
        
      </div>
    </div>
   
   );
}

export default Header
