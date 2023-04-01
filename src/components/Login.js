import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import FacebookLoginComponent from './FacebookLoginComponent';
import Spinner from 'react-bootstrap/Spinner';


const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const onChange = async (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    let navigate = useNavigate();
    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const response = await fetch("https://icontacts-gaurav-backend.onrender.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            setLoading(false);
            localStorage.setItem("token", json.authtoken);
            props.setName(json.name);
            console.log(json.name);
            navigate('/');
            props.showAlert("Logged in Succesfully", "success");
        }
        else {
            setLoading(false);
            props.showAlert("Invalid details", "danger")
        }
    }
    return (
        <div className='container'>
            <h2 className='my-2'>Login to continue to iContacts</h2>
            <form onSubmit={onSubmit}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" >Login</button>
                {loading &&
                    <div className='my-2'>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                }
                <div className='my-2'> Doesn't have an account? <Link className='text-decoration-none' to="/signup">Click here</Link> to Sign up! </div>
                <div className='my-4'>
                    <FacebookLoginComponent credentials={credentials} setName={props.setName} showAlert={props.showAlert} />
                </div>
            </form>
        </div>
    )
}

export default Login
