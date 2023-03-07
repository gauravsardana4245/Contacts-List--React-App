import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

const SetPassword = (props) => {
    const [credentials, setCredentials] = useState({ spassword: "", scpassword: "" });

    const onChange = async (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();
    const location = useLocation();
    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ name: location.state.name, email: location.state.email, password: credentials.spassword })
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
        <div>
            <div className='container'>
                <h2 className='my-2 mb-4'>Set a password for your iContacts account</h2>
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label"><h5 className='d-inline'>Name: </h5> {location.state.name}</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label"><h5 className='d-inline'>Email  address: </h5> {location.state.email}</label>
                    </div>
                    <div>
                        <label htmlFor="spassword" className="form-label">Enter Password</label>
                        <input type="password" className="form-control" id="spassword" name='spassword' onChange={onChange} required minLength={5} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="scpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="scpassword" name='scpassword' onChange={onChange} minLength={5} />
                    </div>
                    <button type="submit" className="btn btn-primary my-2" >Create account</button>
                </form>
            </div>
        </div>
    )
}

export default SetPassword
