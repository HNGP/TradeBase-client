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
  const logout = () => {
    history.push("/");
    setUserData({
      token: undefined,
      user: undefined,
    })
    localStorage.setItem("auth-token", "");
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
        <h2 onClick={home}>Tradebase</h2>
        {userData.token ? (
        <div>
          <button onClick={stock}>StockPage</button>
          <button onClick={logout}>Logout</button>
          </div>):(
        <div>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>
        )}
        <input></input>
      </div>
    </div>
   
   );
}

export default Header
/*import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../context/userContext'
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types"
import './header.css'

const Header = () => {
  const [scrolled, setScrolled] = useState({
    hasScrolled: false,
  });

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  
  const stock = () => history.push("/");
  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    })
    localStorage.setItem("auth-token", "");
  }
  const handleScroll = (event) => {
    const scrollTop = window.pageYOffset
   
    if (scrollTop > 50) {
      setScrolled({hasScrolled: true});
    } else {
      setScrolled({hasScrolled: false})
    }
      
  }
  
  useEffect(() =>{
    window.addEventListener('scroll', handleScroll)
  }, []);
    
  return(
    <div className={scrolled.hasScrolled ? 'Header HeaderScrolled' : 'Header'}>
      <div className="HeaderGroup">
        <h2>Tradebase</h2>
        {userData.user ? (
        <div>
          <button onClick={stock}>StockPage</button>
          <button onClick={logout}>Logout</button>
        </div>):(
        <div>
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>
        )}
        
        <input></input>
      </div>
    </div>
   
  );
}

export default Header
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNzg0NjZjYWEwMmU0OGFlN2I1M2ZjNyIsImlhdCI6MTYwMTcyMzAzOH0.Z3qmodTDAtnqmXMpKrBY-qkuJZ7hdDzngIzvjMFQobs
*/