import React from 'react';
import './App.scss';
import Header from '../Header/Header'
import LandingPage from "../Main/LandingPage";
import GameMain from "../Layouts/Game/GameMain";
import CompanyMain from "../Layouts/Company/CompanyMain"
import {BrowserRouter as Router, Route} from "react-router-dom"

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




function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <br/>
                <Route exact path="/"  component={LandingPage}/>
                <Route exact path="/games/:gameId" component={GameMain}/>
                <Route exact path="/companies/:companyId" component={CompanyMain}/>
            </div>
        </Router>

  );
}

export default App;
