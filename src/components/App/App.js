import React from 'react';
import './App.scss';
import Header from '../Header/Header'
import LandingPage from "../Main/LandingPage";
import GameLayout from "../Layouts/Game/game-main";
import {BrowserRouter as Router, Route} from "react-router-dom"


function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <br/>
                <Route path="/" exact component={LandingPage}/>
                <Route path="/games/:gameId" component={GameLayout}/>
            </div>
        </Router>

  );
}

export default App;
