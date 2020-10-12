import React from 'react'
import {useEffect, useState} from "react";
import axios from "axios";

const Top100 = ({mouseIn, mouseOut, emoji}) => {
    const [information, setInformation] = useState([])
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-top100',
            data: `limit: 1;`

        })

            .then(returnedResponse => {
                let dataCopy = []
                let colorCopy = []
                for (let i = 0; i < 10; i++) {
                    dataCopy.push({
                        key: returnedResponse.data[0][i].id,
                        name: returnedResponse.data[0][i].name,
                        date: returnedResponse.data[0][i].first_release_date,
                        summary: returnedResponse.data[0][i].summary,
                        aggregated_rating: returnedResponse.data[0][i].aggregated_rating,
                        genres: returnedResponse.data[0][i].genres,
                        platforms: returnedResponse.data[0][i].platforms,
                        cover: returnedResponse.data[0][i].cover.url ? returnedResponse.data[0][i].cover.url.replace("t_thumb", "t_cover_big") : null,
                        SACresColor: returnedResponse.data[1][i][0].SAC,
                        SQACresColor: returnedResponse.data[1][i][1].SQAC,
                        DACresColor: returnedResponse.data[1][i][2].DAC
                    })
                }
                console.log(dataCopy)
                setInformation(dataCopy);
                colorCopy.push(information.info.SQACresColor)
            })
            .catch(err => {
                console.error(err + " check maping or routes");

            })
    }, [])

    return (
        information.map((info,index)=>
            <div className={"media-card has-rank"}>
                <div className={"rank-box"}>
                    <span className={"hash"}>#</span>{index + 1}
                </div>
                <a className={"cover"}>
                    <img className={"image-loaded"} src={info.cover}/>
                </a>
                <div className={"content"}>
                    <div className={"row title"}>
                        <div className={"title-wrap"}>
                            <a href={`/games/${info.key}`}onMouseEnter={(evt)=>{mouseIn(evt, info.SACresColor, info.key)}} onMouseOut={(evt)=>{mouseOut(evt,info.key)}} className={"title-link"} id={`title + ${info.key}`}>{info.name}</a>
                        </div>
                        <div key={info.key} id={"genres"}>
                        {info.genres === undefined ?
                                <a className={"genre"} id={`genre-info + ${info.key}`} style={{backgroundColor: `rgb(${info.SQACresColor[0]},${info.SQACresColor[1]},${info.SQACresColor[2]})`}}></a>
                        : info.genres.slice(0,3).map((gen,index)=>
                                <a className={"genre"} id={`genre-info + ${info.key}`} style={{backgroundColor: `rgb(${info.SQACresColor[0]},${info.SQACresColor[1]},${info.SQACresColor[2]})`}}>{gen.name === undefined ? `Unknown`: gen.name}</a>)}
                        </div>
                    </div>
                    <div className={"row score"}>
                        <div className={"emoji"} id={`emoji + ${info.key}`} >{emoji(Math.round(info.aggregated_rating),info.SQACresColor, info.key)}</div>
                        <p className={"rating-info"} id={`rating-info + ${info.key}`} >{info.aggregated_rating !== undefined ? `${Math.round( info.aggregated_rating)}%` : 'Unrated'}</p>

                    </div>
                    <div className={"row plat"}>
                        {info.platforms.slice(0,2).map((plat,index)=>
                            <div key={index} id={"100-plat-index"}>
                                <a key={index} className={"100-platform-info"} id={`plat + ${info.key}`}>{plat.abbreviation}</a>
                            </div>
                        )}

                    </div>
                    <div className={"row date"}>
                        <div>
                            {new Date((info.date * 1000)).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

        )
    )
}

export default Top100