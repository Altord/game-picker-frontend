import React, { useState, useEffect, createContext } from 'react';
import jwt_decode from "jwt-decode";
import setAuthToken from "../components/Utils/Auhtorization/setAuthToken";
import logoutUsers from "../components/Utils/Auhtorization/authActions";


export const UserContext = createContext(null);

//Provide a global state for the user that all the components can refrence
const UserContextProvider = (props)=>{
   //Set logged in userData
   
    const [userData, setUserData] = useState({})
    
    
    useEffect(()=>{
        //Assign JWT User data
        let checkLogged = async() =>{
            if (localStorage.jwtToken){
                const token = localStorage.jwtToken;
                const games= localStorage.games
                setAuthToken(token)
                const authDecoded = jwt_decode(token)
                setUserData(authDecoded)
                //Check if games-status array has been declared and update the main status if so (from local storage)
                if (localStorage.games !== undefined){
                    const games= localStorage.games
                    const gamesDecoded = jwt_decode(games)   
                    authDecoded.games = gamesDecoded.games 
                    console.log(authDecoded)
                    setUserData(authDecoded)
                    
                }          
            } 
            
            const currentTime = Date.now() / 1000
            if (userData.exp < currentTime) {
                logoutUsers();
                setUserData({});    // Redirect to login
                window.location.href = "./login";
            }
        }

        checkLogged();

    },[])

    
  
    
    return(
        <UserContext.Provider value={{userData,setUserData}}>
            {props.children}
        </UserContext.Provider>
    )

}

export default UserContextProvider;

