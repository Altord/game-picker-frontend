import React from 'react';
import './App.scss';
import Header from '../Header/Header'
import LandingPage from "../Main/LandingPage";
import GameMain from "../Layouts/Game/GameMain";
import CompanyMain from "../Layouts/Company/CompanyMain"
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Browse from "../Layouts/Browse/Browse";
import UserSignupForm from "../User/Registration/Register";
import UserLoginForm from "../User/Login/Login";
import UserContextProvider from "../../Context/UserContextProvider"

import UserProfile from "../User/Profile/UserMain";

//Scrolling for the header
var prevScrollpos = window.pageYOffset;
window.onscroll = function(){
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos) {
            document.getElementById("nav-container").style.top = "0";

        } else {
            document.getElementById("nav-container").style.top = "-70px";
        }
        prevScrollpos = currentScrollPos;
    }



//I'm using react-router in order to switch out components on link clicks
function App() {
    return (

            <Router>
                     <UserContextProvider>
                        <div className="App">
                            <Header/>
                            <Route exact path="/"  component={LandingPage}/>
                            <Route exact path="/browse" component={Browse}/>
                            <Route exact path="/games/:gameId" component={GameMain}/>
                            <Route exact path="/companies/:companyId" component={CompanyMain}/>
                            <Route path="/users/register" component = {UserSignupForm}/>
                            <Route path="/users/login" component = {UserLoginForm}/>
                            <Route path="/users/:id/profile" component={UserProfile}/>
                        </div>
                     </UserContextProvider>
                    
      

            </Router>



  );
}

export default App;
