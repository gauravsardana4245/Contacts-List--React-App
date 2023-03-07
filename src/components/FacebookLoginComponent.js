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
            const res = await fetch("http://localhost:5000/api/auth/fetchallusers", {
                method: 'GET'
            });
            let a = 0;
            const json = await res.json();
            console.log(json);
            for (let index = 0; index < json.length; index++) {
                let user = json[index];
                if (user.email == response.email) {
                    console.log("matched");
                    // const response = await fetch("http://localhost:5000/api/auth/login", {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json'

                    //     },
                    //     body: JSON.stringify({ email: response.email, password: credentials.password })
                    // });
                    // const json = await response.json();
                    // console.log(json);
                    // if (json.success) {
                    //     localStorage.setItem("token", json.authtoken);
                    //     props.setName(json.name);
                    //     console.log(json.name);
                    //     navigate('/');
                    //     props.showAlert("Logged in Succesfully", "success");
                    // }
                    // else {
                    //     props.showAlert("Invalid details", "danger")
                    // }
                    alert("User with this email already exists! Signin with your username and password.");
                    navigate('/login');
                    a = 1;
                    console.log(a);
                    break;
                }
            }
            if (a !== 1) {
                navigate('/setpassword', {
                    state: {
                        name: response.name,
                        email: response.email
                    }
                });
            }


        }


        else {
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
        <div className="container" >
            {/* {!login && ( */}
            <FacebookLogin

                appId="580260534020961"
                autoLoad={false}
                fields="name,email,picture"
                scope="public_profile,email,user_friends"
                callback={responseFacebook}
                icon="fa-facebook"
            />
            {/* )} */}
            {/* 
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
            )} */}
        </div>
    );
}

export default FacebookLoginComponent
