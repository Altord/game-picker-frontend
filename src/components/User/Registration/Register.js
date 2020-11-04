import React,{useState,useEffect} from 'react'
import {Link, Redirect, useHistory} from 'react-router-dom'
import background from "../../../images/icons/24223373.png"
import './register.scss'
import axios from "axios";
import qs from 'qs'
const UserSignupForm = () =>{
    const history = useHistory();
    const initialState = {
        name: "",
        email: "",
        password: "",
        password2: "",
    }
    const[information, setInformation] = useState(initialState)
    const[errorInfo, setErrorInfo] = useState(initialState)
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
            url: 'http://localhost:3001/api/users/register'
        },[])
            .then(response =>{
                    console.log(response.data)


            })

            .catch(err => {
                setErrorInfo(initialState)
                setErrorInfo({
                    name: err.response.data.name,
                    email: err.response.data.email,
                    password: err.response.data.password,
                    password2: err.response.data.password2
                })
            });
        setTimeout(()=> {
            if(errorInfo === initialState){
                history.push('/users/login')
            }
        },1000)
    }

    return (
        token === undefined ?
        <div className={"form-container"}>
            <div className={"form-image"} style={{background: `url(${background})`}}/>
            <div className={"col2"}>
                <div className={"form-info"}>
                    <h4>
                        Register Below
                    </h4>

                </div>
                <form onSubmit={onSubmit} className={"form-inputs"}>
                    <div className={"input-field"}>
                        <label htmlFor="name">Username</label>
                        <input onChange={handleChange} value={information.name} id="name" type="text"/>
                        {errorInfo.name === "" ? [] : <div>{errorInfo.name}</div>}
                    </div>
                    <div className={"input-field"}>
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} value={information.email} id="email" type="email"/>
                        {errorInfo.email === "" ? [] : <div>{errorInfo.email}</div>}
                    </div>
                    <div className={"input-field"}>
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={information.password} id="password" type="password"/>
                        {errorInfo.password === "" ? [] : <div>{errorInfo.password}</div>}
                    </div>
                    <div className={"input-field"}>
                        <label htmlFor="password2">Confirm Password</label>
                        <input onChange={handleChange} value={information.password2} id="password2" type="password"/>
                        {errorInfo.password2 === "" ? [] : <div>{errorInfo.password2}</div>}

                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                            Sign up
                        </button>
                    </div>
                    <div className={"exist"}>
                        <p className="grey-text text-darken-1">
                            Already have an account? <Link to="/users/login" className={"exist-login"}>Log in</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
            : <Redirect to={"/"}/>
    );

}

export default UserSignupForm;