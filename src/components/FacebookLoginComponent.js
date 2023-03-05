import React, { useState, useRef } from "react";
import FacebookLogin from "react-facebook-login";
import { useNavigate } from "react-router-dom";


const FacebookLoginComponent = (props) => {
    const { credentials } = props;
    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState("");
    const navigate = useNavigate();
    const responseFacebook = async (response) => {
        console.log(response);
        // Login failed
        if (response.status === "unknown") {
            alert("Login failed!");
            setLogin(false);
            return false;
        }
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
            setLogin(true);
            const res = await fetch("http://localhost:5000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify({ name: response.name, email: response.email, password: "123456" })
            });
            const json = await res.json();
            console.log(json);
            if (json.success) {
                if (!localStorage.getItem("token")) {
                    localStorage.setItem("token", json.authtoken);
                }

                props.setName(json.name);
                navigate('/');
                props.showAlert("Signed up successfully", "success");
            }
            else {
                props.showAlert("Invalid credentials", "danger")
            }

            // localStorage.setItem('token', response.accessToken)
            // credentials.name = response.name;
            // credentials.email = response.email
            // props.setName(response.name);
            // navigate('/');

        } else {
            setLogin(false);
        }
    };
    const ref = useRef();
    const logout = () => {
        setLogin(false);
        setData({});
        setPicture("");
    };

    return (
        <div className="container">
            {!login && (
                <FacebookLogin
                    appId="580260534020961"
                    autoLoad={false}
                    fields="name,email,picture"
                    scope="public_profile,email,user_friends"
                    callback={responseFacebook}
                    icon="fa-facebook"
                />
            )}

            {login && (
                <div className="card">
                    <div className="card-body">
                        <img className="rounded" src={picture} alt="Profile" />
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">Email ID: {data.email}</p>
                        <a href="/" className="btn btn-danger btn-sm" ref={ref} onClick={logout}>
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FacebookLoginComponent
