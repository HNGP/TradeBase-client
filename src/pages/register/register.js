import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../../context/userContext'
import ErrorNotice from '../../misc/errorNotice'

export default function Register() {
    
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async(e) => {
        e.preventDefault();
        try {
            const regUser = await fetch('http://localhost:3000/register', {
                method: 'post',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })
            const response = await regUser.json();
            if(response) {
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
                } else {
                    res.msg && setError(res.msg);
                }
            }
        } catch(err) {
            err.message && setError(err.message);
        }
       
       
    }

    return (
        <div className="loginCard">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={()=> setError(undefined)} />}
            <form className="form" onSubmit={submit}>
                
                <input type="text" class="authInput" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                
                <input type="email" class="authInput" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
               
                <input type="password" class="authInput" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" class="button" value="Submit" />
            </form>
        </div>
    )
}
