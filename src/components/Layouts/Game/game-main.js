import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './game-main.scss'




const GameLayout = ({match}) =>{
    const {
        params: { gameId },
    } = match;
    const [information, setInformation] = useState([])
    useEffect(()=>{
        axios({
            method: 'post',
            url: `http://localhost:3001/games/id`,
            data: {gameId: gameId}


        })

            .then(returnedResponse =>{
                let dataCopy = []
                let colorCopy = []
                let screenShotArray = []
                for (let i = 0; i < returnedResponse.data[0][0].screenshots.length; i++) {
                    screenShotArray.push(returnedResponse.data[0][0].screenshots[i].url ? returnedResponse.data[0][0].screenshots[i].url.replace("t_thumb","t_1080p") : null)
                }
                dataCopy.push({
                    key: returnedResponse.data[0][0].id,
                    name: returnedResponse.data[0][0].name,
                    summary: returnedResponse.data[0][0].summary,
                    aggregated_rating: returnedResponse.data[0][0].aggregated_rating,
                    genres: returnedResponse.data[0][0].genres, platforms: returnedResponse.data[0][0].platforms,
                    cover: returnedResponse.data[0][0].cover.url ? returnedResponse.data[0][0].cover.url.replace("t_thumb", "t_cover_big") : null,
                    resColor: returnedResponse.data[1][0][0].SAC,
                    screenShots: screenShotArray
                })
                console.log(dataCopy)
                setInformation(dataCopy);
                colorCopy.push(information.resColor)
            })
            .catch(err => {
                console.error(err +" check maping or routes");

            })
    },[gameId])

    return(
        information.map(info=>
            <div className={"page-content"}>
                <div className={"header-wrap"}>
                    <div className={"banner"} style={{backgroundImage: `url(${info.screenShots[0]})`}}/>
                    <div className={"header"}>
                        <div className={"container"}>
                            <div className={"cover-wrap overelap-banner"}>
                                <div className={"cover-wrap-inner"}>
                                    <img src={info.cover} class={"cover"}/>
                                    <div className={"actions"}>
                                        <div className={"list"}>
                                            <div className={"add"}>
                                                Add to List
                                            </div>
                                            <div className={"dropdown"}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="white" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
                                            </div>
                                        </div>
                                        <div className={"favorite"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"/></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={"content"}>
                                <h1>{info.name}</h1>
                                <p className={"summary"}>{info.summary}</p>

                            </div>
                            <div className={"score-wrapper"}>
                                <div className={"score"}>
                                    {info.aggregated_rating}<svg height={"100px"} width={"100px"} xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><line x1='0' y1='100' x2='100' y2='0' stroke-width='1.2' stroke='white'/></svg>100
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
                <div className={"content-container"}>

                </div>
            </div>
        )




    )

}

export default GameLayout