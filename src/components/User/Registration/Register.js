import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import background from "../../../images/icons/24223373.png"
import './register.scss'
import axios from "axios";
import qs from 'qs'
const UserSignupForm = () =>{
    const[information, setInformation] = useState({
            name: "",
            email: "",
            password: "",
            password2: "",
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
            url: 'http://localhost:3001/api/users/register'
        },[])
            .then(response =>{
                    console.log(response.data)


            })

            .catch(err => {
                console.error("The entry is already present within the database");
            });

    }

    return (

        <div className={"form-container"}>
            <div className={"form-image"} style={{background: `url(${background})`}}></div>
            <div className={"col2"}>
                <div className={"form-info"}>
                    <h4>
                        Register Below
                    </h4>

                </div>
                <form noValidate onSubmit={onSubmit} className={"form-inputs"}>
                    <div className={"input-field"}>
                        <label htmlFor="name">Username</label>
                        <input onChange={handleChange} value={information.name} id="name" type="text"/>

                    </div>
                    <div className={"input-field"}>
                        <label htmlFor="email">Email</label>
                        <input onChange={handleChange} value={information.email} id="email" type="email"/>

                    </div>
                    <div className={"input-field"}>
                        <label htmlFor="password">Password</label>
                        <input onChange={handleChange} value={information.password} id="password" type="password"
                        />

                    </div>
                    <div className={"input-field"}>
                        <label htmlFor="password2">Confirm Password</label>
                        <input onChange={handleChange} value={information.password2} id="password2" type="password"
                        />

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
    );

}

export default UserSignupForm;