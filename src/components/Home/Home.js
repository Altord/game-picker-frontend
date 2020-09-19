import React from 'react'
import BasicSearch from "../Search/Search";

const Header = () => {
    return(
        <div>
            <header>
                <BasicSearch />
                <div>
                    Games
                </div>
                <div>
                    Database
                </div>
                <div>
                    Help
                </div>
                <div>
                    Sign Up
                </div>
                <div>
                    Log In
                </div>
            </header>
        </div>
    )
}

export default Header