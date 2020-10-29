import React, {useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import background from "../../../images/icons/24223373.png";
import './login.scss'
import qs from 'qs'

const UserLoginForm = ()=>{
    const [user, setUser] = useState(null)
    const[information, setInformation] = useState({
        email: "",
        password: "",
    })


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
                console.log(response.data)


            })

            .catch(err => {

            });

    }



    return (
        <div className={"login-form-container"}>
            <div className={"form-image"} style={{background: `url(${background})`}}></div>
            <div className={"col2"}>
                <div className={"form-info"}>
                    <h4>
                        Sign In Below
                    </h4>

                </div>
                <form noValidate onSubmit={onSubmit} className={"form-inputs"}>

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
                        <button type="submit" className="btn btn-large waves-effect waves-light hoverable blue accent-3">
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
                        <button className={"guest-button"}>
                            Guest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserLoginForm;