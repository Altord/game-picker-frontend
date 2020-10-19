import React from "react";
import BasicSearch from "./BasicSearch";

const SearchInformation = ({name, platforms, genres, score, cover}) => {

    return(
        <div>
            <div>
                <p>Name: {name}</p>
                <p>Platforms: {platforms}</p>
                <p>Genres: {genres}</p>
                <p>Score: {score}</p>
                <img src={cover} alt={"game-cover"}/>

            </div>
            <div>

            </div>
        </div>
    )


}
export default SearchInformation