import React from 'react';
import setAuthToken from "./setAuthToken";

const logoutUsers = () =>{

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("games");
    setAuthToken(false);

}

export default logoutUsers;