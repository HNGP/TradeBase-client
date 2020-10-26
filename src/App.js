import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/header/header"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import Landing from "./pages/landing/landing"
import Stockpage from "./pages/stockPage/stockPage"
import UserContext from './context/userContext'
import './index.css'


const App = () => {
  
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      let user = localStorage.getItem("user-id");
      if(token === null) {
        localStorage.setItem("auth-token","");
        localStorage.setItem("user-id","");
        token = "";
        user = "";
      }
      const tokenRes = await fetch('http://localhost:3000/tokenValid', {
        method: 'post',
        headers: {'x-auth-token': token },
      });
      const response = await tokenRes.json();
      if(response) {
        const userRes = await fetch('http://localhost:3000/user', {
          method: 'get',
          headers: {'x-auth-token': token },
        });
        const res = await userRes.json();
        setUserData({
          token,
          user: res,
        });
      }
    }
    checkLoggedIn();
  }, [])

  return (
    <div className="Content"> 
    
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
        <div className="Nav"><Header/></div> 
        <div className="container">
       
            <Switch>
          
              <Route exact path="/" component={Landing} />
              <Route path="/stockPage" component={Stockpage} />
              
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            
            </Switch>
          </div>

        
         
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
