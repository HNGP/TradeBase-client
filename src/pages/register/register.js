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
                }
            }
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg);
        }
       
       
    }

    return (
        <div className="content">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={()=> setError(undefined)} />}
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-name">Name</label>
                <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="register-email">Email</label>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="register-password">Password</label>
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
