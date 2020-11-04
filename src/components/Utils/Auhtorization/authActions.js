import React from 'react';
import setAuthToken from "./setAuthToken";

const logoutUsers = () =>{

    localStorage.removeItem("jwtToken");
    setAuthToken(false);

}

export default logoutUsers;