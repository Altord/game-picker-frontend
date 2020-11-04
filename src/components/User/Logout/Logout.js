import React,{useContext} from 'react'
import '../../Header/header.scss'
import logoutUsers from "../../Utils/Auhtorization/authActions";
import {useHistory} from "react-router-dom";

const UserLogOut = () =>{
    const history = useHistory();
    let onClick = () =>{
        logoutUsers()

    }
    return(
        <div>
            <a href={"/users/login"}><div onClick={onClick}  className={"log-out"}>Log Out</div></a>
        </div>
    )
}

export default UserLogOut;