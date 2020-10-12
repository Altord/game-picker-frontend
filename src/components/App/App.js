import React from 'react';
import './App.scss';
import Header from '../Header/Header'
import LandingPage from "../Main/LandingPage";
import GameLayout from "../Layouts/Game/game-main";
import {BrowserRouter as Router, Route} from "react-router-dom"
import GameHome from "../Layouts/Game/game-home";

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

                <Route exact path="/games/:gameId" component={GameLayout}/>
            </div>
        </Router>

  );
}

export default App;
