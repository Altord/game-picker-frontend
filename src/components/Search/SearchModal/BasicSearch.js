import React, {useState} from 'react';
import axios from "axios"
import SearchInformation from "./SearchInformation";

const BasicSearch = ({searchInfo}) => {
    const [information, setInformation] = useState([])
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-search',
            data: {
                searchInfo
            }
        })

            .then(returnedResponse =>
                setInformation({
                    name: information.name = returnedResponse.data[0].name,
                    platforms: information.platforms = returnedResponse.data[0].platforms.map(p=><div>{p.abbreviation}</div>),
                    genres: information.genres = returnedResponse.data[0].genres.map(g => <div>{g.name}</div>),
                    score: information.score = Math.round(returnedResponse.data[0].aggregated_rating),
                    cover: information.cover = returnedResponse.data[0].cover ? returnedResponse.data[0].cover.url.replace("t_thumb", "t_cover_big") : null
                },console.log(returnedResponse.data[0])))
            .catch(err => {
                console.error(err +" fix this you dipshit");

            })


    return(
        <div className={"search-results"}>
            <div className={"result-col"}><h3 className={'results-title'}>Games</h3>
                <div className={'result'}>
                    <div>
                        <a href={`/game/gameid`}>
                            <img src={''}/>
                            <div className={'game-title'}>
                                <div className={'game-category'}></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className={"result-col"}><h3 className={'results-title'}>Companies</h3> </div>
            <div className={"result-col"}><h3 className={'results-title'}>Character</h3> </div>
            <div className={"result-col"}><h3 className={'results-title'}>Themes</h3> </div>
            <div className={"result-col"}><h3 className={'results-title'}>Categories</h3> </div>
            <div className={"result-col"}><h3 className={'results-title'}>Platform</h3> </div>
        </div>
    )
}



export default BasicSearch
