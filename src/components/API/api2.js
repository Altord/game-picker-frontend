/**import React, {useState} from 'react'
import axios from "axios"
const client = process.env.REACT_APP_IGDB_API_KEY



export const createNewApi = () => {


    const apiSearch = searchValue => {
        const fetchData = async () => {
            axios({
                url: "https://polar-temple-75375.herokuapp.com/https://api-v3.igdb.com/games",
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'user-key': client
                },
                data: "fields name,genres.*,platforms,aggregated_rating,cover.*;" +
                    `search ${searchValue};` + 'limit: 1;' // Grabbing the basic info, setting search result limit to 1
                    //`search "${query}";`
                   })
                .then(response => {
                    setInformation({
                        name: information.name = response.data[0].name,
                        platforms: information.platforms = response.data[0].platforms,
                        genres: information.genres = response.data[0].genres.map(g => g.name),
                        score: information.score = Math.round(response.data[0].aggregated_rating),
                        cover: information.cover = response.data[0].cover ? response.data[0].cover.url.replace("t_thumb", "t_cover_big"): null
                    })
                    console.log(response.data[0])
                })
                .catch(err => {
                    console.error("fix this you dipshit");

                });}

        fetchData();
      }


    return(
        <div>
            <div>
                <div>
                    <form className="search">

                        <input onClick={handleSubmit} type="submit" value="SEARCH" />
                    </form>
                </div>

                <div><img src={information.cover}/></div>

                {information.name}
                <div>
                    {information.score} {information.genres[0]}

                </div>
                {information.genres[1]}
            </div>
        </div>
    )
}





export default {HandleBasicInfo, };
**/