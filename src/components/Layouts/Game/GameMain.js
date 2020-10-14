import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './game-main.scss'



// Displays main game information
const GameMain = ({match}) =>{
    // Captures the id and send it to the backend
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
            //The axios response data being pushed to an array and then informations state being set by it
            .then(returnedResponse =>{
                let dataCopy = []
                let colorCopy = []
                let screenShotArray = []
                for (let i = 0; i < returnedResponse.data[0][0].screenshots.length; i++) {
                    screenShotArray.push(returnedResponse.data[0][0].screenshots[i].url ? returnedResponse.data[0][0].screenshots[i].url.replace("t_thumb","t_1080p") : null)
                }
                dataCopy.push({
                    age: returnedResponse.data[0][0].age_ratings,
                    artworks: returnedResponse.data[0][0].artworks,
                    franchises: returnedResponse.data[0][0].franchises,
                    date: new Date(returnedResponse.data[0][0].first_release_date * 1000),
                    involved_companies: returnedResponse.data[0][0].involved_companies,
                    storyline: returnedResponse.data[0][0].storyline ,
                    themes : returnedResponse.data[0][0].themes ,
                    total_rating : returnedResponse.data[0][0].total_rating ,
                    videos : returnedResponse.data[0][0].videos ,
                    key: returnedResponse.data[0][0].id,
                    name: returnedResponse.data[0][0].name,
                    summary: returnedResponse.data[0][0].summary,
                    screenShots: screenShotArray,
                    cover: returnedResponse.data[0][0].cover.url ? returnedResponse.data[0][0].cover.url.replace("t_thumb", "t_cover_big") : null,
                    resColor: returnedResponse.data[1][0][0].SAC,
                    aggregated_rating: returnedResponse.data[0][0].aggregated_rating,
                    genres: returnedResponse.data[0][0].genres,
                    platforms: returnedResponse.data[0][0].platforms,





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
        //Initial rendering of the page
        information.map(info=>
            <div className={"game-page-content"}>
                <div className={"header-wrap"}>
                    <div className={"banner"} style={{backgroundImage: `url(${info.screenShots[0]})`}}/>
                    <div className={"header"}>
                        <div className={"container"}>
                            <div className={"cover-wrap overelap-banner"}>
                                <div className={"cover-wrap-inner"}>
                                    <img src={info.cover} className={"cover"}/>
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
                                <p style={{whiteSpace: "pre-wrap"}} className={"summary"}>{info.summary}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"content-container"}>
                    <div className={"sidebar"}>
                        <div className={"data"}>
                            {info.aggregated_rating === undefined ?
                                <div className={"data-set"}>
                                    <div className={"type"}>Total Rating</div>
                                    <div className={"value"}>Unrated</div>
                                </div> : <div className={"data-set"}>
                                    <div className={"type"}>Aggregated Rating</div>
                                    <div className={"value"}>{Math.round(info.aggregated_rating)}</div>
                                </div>}
                            {info.total_rating === undefined ? <div className={"data-set"}>
                                    <div className={"type"}>Total Rating</div>
                                    <div className={"value"}>Unrated</div>
                                </div> : <div className={"data-set"}>
                                    <div className={"type"}>Total Rating</div>
                                    <div className={"value"}>{Math.round(info.total_rating)}</div>
                                </div>}
                            {info.franchises === undefined ? null :
                                <div className={"data-set"}>
                                    <div className={"type"}>Franchises</div>
                                    <div className={"value"}>{info.franchises.slice(0,info.franchises.length).map(names=>names.name)}</div>
                                </div>
                            }
                            {info.involved_companies === undefined ? null :
                                    <div className={"data-set"}>
                                        <div className={"type"}>Companies</div>
                                        <div className={"value"}>{info.involved_companies.slice(0,info.involved_companies.length).map(names=>`${names.company.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                    </div>
                            }

                            {info.platforms === undefined ? null:
                                <div className={"data-set"}>
                                    <div className={"type"}>Platforms</div>
                                    <div className={"value"}>{info.platforms.slice(0,info.platforms.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                </div>
                            }
                            {info.date === undefined ? null :
                                <div className={"data-set"}>
                                    <div className={"type"}>Release Date</div>
                                    <div className={"value"}>{(info.date).toLocaleDateString('en-US',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                            }
                            {info.themes === undefined ? null :
                                <div className={"data-set"}>
                                    <div className={"type"}>Themes</div>
                                    <div className={"value"}>{info.themes.slice(0,info.platforms.length).map(names=>`${names.name} `)}</div>
                                </div>

                            }




                        </div>
                    </div>
                    <div className={"overview"}></div>
                </div>
            </div>
        )




    )

}

export default GameMain