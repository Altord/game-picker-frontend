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
                <AuthContext.Provider>
                <div className="App">
                    <Header/>
                    <br/>
                    <Route exact path="/"  component={LandingPage}/>
                    <Route exact path="/browse" component={Browse}/>
                    <Route exact path="/games/:gameId" component={GameMain}/>
                    <Route exact path="/companies/:companyId" component={CompanyMain}/>
                    <Switch>
                        <Route path="/users/register" component = {UserSignupForm}/>
                        <Route path="/users/login" component = {UserLoginForm}/>
                        {/*<Route path={"/users/:userId"} componet={}*/}
                    </Switch>


                </div>
                </AuthContext.Provider>
            </Router>



  );
}

export default App;
