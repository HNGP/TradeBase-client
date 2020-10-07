import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../../context/userContext'
import ErrorNotice from "../../misc/errorNotice";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async(e) => {
        e.preventDefault();
        try {
            const loginRes = await fetch('http://localhost:3000/login', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            const res = await loginRes.json();
            if(res.token) {
                setUserData({
                    token: res.token,
                    user: res.user,
                })
                localStorage.setItem("auth-token", res.token);
                history.push("/");
            }
        } catch(err) {
            err.response.msg && setError(err.response.msg);
        }
    }
        
       
    return (
        <div className="content">
            <h2>Login</h2>
            {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} />
             )}
            <form>
                <label htmlFor="register-email">Email</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="register-password">Password</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Submit" onClick={submit}/>
            </form>
        </div>
    )
}
