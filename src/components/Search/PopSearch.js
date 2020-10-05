import React, {useEffect, useState} from 'react';
import axios from "axios"
import './FrontPageSearch.scss'


const PopSearch = ({mouseIn, mouseOut, emoji, color}) =>{
    const [information, setInformation] = useState([])

    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-popularity',
            data: `limit: 1;`

        })

            .then(returnedResponse =>{
                let copy = []
                for (var i = 0; i < 7; i++){
                    copy.push({key: returnedResponse.data[i].id, name: returnedResponse.data[i].name, aggregated_rating: returnedResponse.data[i].aggregated_rating, genres: returnedResponse.data[i].genres, platforms: returnedResponse.data[i].platforms, cover: returnedResponse.data[i].cover.url ? returnedResponse.data[i].cover.url.replace("t_thumb", "t_cover_big") : null })
                }setInformation(copy); console.log(returnedResponse.data); console.log(copy)})

            .catch(err => {
                console.error(err +" check maping or routes");

            })
    },[])

//conditionally render the images/cover otherwise it'll end up being improper
    return(

        information.map(info=>
            <div className={"media-card"} key={info.key} id={"media-card"}>
                <a onMouseEnter={mouseIn} onMouseLeave={mouseOut} className={"cover"} href={""} id={"cover"}>
                    <img className={"image-loaded"} src={info.cover} id={"image-loaded"}/>
                    <div className={"more-details"}>
                        <div className={"clearing"}>
                            <div className={"rating"}>
                                <p className={"rating-info"}>{Math.round(info.aggregated_rating)}%</p>
                                <div className={"emoji"}>{emoji(Math.round(info.aggregated_rating))}</div>
                            </div>
                            {info.genres.slice(0,1).map(id=>
                                <div>
                                    <h2 className={"genre-info"}>{id.name}</h2>

                                </div>)}
                            {info.platforms.slice(0,2).map(id=>
                                <p className={"platform-info"}>{id.abbreviation}</p>


                            )}

                        </div>


                    </div>

                </a>
                <a onMouseEnter={mouseIn} onMouseLeave={mouseOut}  className={"title"} href={""} id={"title"}>{info.name}</a>
            </div>)


    )

}


export default PopSearch;


