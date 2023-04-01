import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import FacebookLoginComponent from './FacebookLoginComponent';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const onChange = async (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch("https://icontacts-gaurav-backend.onrender.com/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem("token", json.authtoken);
            props.setName(json.name);
            navigate('/');
            props.showAlert("Signed up successfully", "success");
        }
        else {
            props.showAlert("Invalid credentials", "danger")
        }
    }
    return (
        <div className='container'>
            <h2 className='my-2 mb-4'>Create an account to start using iContacts</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name='name' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className="form-label">Date of birth</label>
                    <input type="date" className="form-control" id="dob" name='dob' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} required minLength={5} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confrrm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} />
                </div>
                <button type="submit" className="btn btn-primary my-2" >Sign up</button>
                <div className='my-4'>
                    <FacebookLoginComponent credentials={credentials} setName={props.setName} showAlert={props.showAlert} />
                </div>
                {/* <div className='my-2'> Already have an account? <Link className='text-decoration-none' to="/login">Login</Link></div> */}
            </form>
        </div>
    )
}

export default Signup
