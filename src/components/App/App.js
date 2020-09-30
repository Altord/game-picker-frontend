import React from 'react';
import './App.css';
import Header from '../Header/Header'
import BasicSearch from "../Search/Search";



function App() {
    return (
    <div className="App">

        <Header/>
        <div>
            <BasicSearch/>
        </div>
    </div>
  );
}

export default App;
