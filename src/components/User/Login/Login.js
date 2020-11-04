import React, {useState,useContext} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { useHistory, Redirect } from "react-router-dom";
import background from "../../../images/icons/24223373.png";
import './login.scss'
import qs from 'qs'
import UserContext from "../../../Context/UserContext";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../Utils/Auhtorization/setAuthToken";

const UserLoginForm = ()=>{
    const history = useHistory();
    const initialState = {
        email: "",
        password: "",
    }
    const[information, setInformation] = useState(initialState)
    const{userData,setUserData,changeUserData} = useContext(UserContext)
    const token = localStorage.jwtToken;

    const handleChange = (event) =>{
        setInformation({
            ...information,
            [event.target.id] : event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault()
        axios({
            method: 'post',
            data: qs.stringify(information),
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: 'http://localhost:3001/api/users/login'
        },[])
            .then(response =>{
                setInformation({
                    email: "",
                    password: ""
                })
                const {token} = response.data;
                localStorage.setItem("jwtToken", token)

            })

            .catch(err => {

            });

        setTimeout(()=>{
            if(localStorage.jwtToken !== undefined){
                history.go(0)
            }
        },600)



    }

    const submitGuest = (event) => {
        event.preventDefault()

        axios({
            method: 'post',
            data: qs.stringify({
                email: "guest@email.com",
                password: "guestpw"
            }),
            headers: {'content-type': 'application/x-www-form-urlencoded'},
            url: 'http://localhost:3001/api/users/login'
        },[])
            .then(response =>{
                setInformation({
                    email: "",
                    password: ""
                })
                const {token} = response.data;
                setAuthToken(token)
                const decoded = jwt_decode(token)
                setUserData(decoded)
                console.log(userData)
                localStorage.setItem("jwtToken", token)

             })

            .catch(err => {

            });

        setTimeout(()=>{
            if(localStorage.jwtToken !== undefined){
                history.go(0)
            }
        },600)



    }

    return (
        token === undefined ?
        <div className={"login-form-container"}>
            <div className={"form-image"} style={{background: `url(${background})`}}></div>
            <div className={"col2"}>
                <div className={"form-info"}>
                    <h4>
                        Sign In Below
                    </h4>

                </div>
                <form onSubmit={onSubmit} className={"form-inputs"}>

                    <div className={"input-field"}>
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} value={information.email} id="email" type="email"/>

                    </div>
                    <div className={"input-field"}>
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={information.password} id="password" type="password"
                        />

                    </div>

                    <div className="button-container">
                       <button type="submit">
                            Log In
                        </button>
                    </div>
                    <div className={"exist"}>
                        <p className="grey-text text-darken-1">
                            Dont have an account? <Link to="/users/register" className={"exist-login"}>Sign Up</Link>
                        </p>
                    </div>
                    <div className={"type-break"}/>
                    <div className={"guest-login"}>
                        <button className={"guest-button"} onClick={submitGuest}>
                            Guest
                        </button>
                    </div>
                </form>
            </div>
        </div>
            : <Redirect to={"/"}/>
    );
}

export default UserLoginForm;