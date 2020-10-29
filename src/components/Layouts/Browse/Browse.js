import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CircleToBlockLoading} from 'react-loadingg'
import "./Browse.scss"

const Browse = () =>{
    const[information, setInfomation] = useState()
    useEffect(()=>{
        axios.post('http://localhost:3001/browse').then(res=>{

            setInfomation(res.data)
        })

    },[])

    return(

        information === undefined ? <CircleToBlockLoading/> : information.map(info=>
            <div className={"browse-page-content"}>
                <div className={"content-container"}>
                    <h1 className={"page-heading"}>Browse</h1>
                    <div className={"section-wrapper"}>
                        <div className={"section-header"}>
                            <div className={"section-heading"}>Platforms</div>
                        </div>
                            <div className={"section-cards"}>

                                {info.platforms.results.slice(0, info.platforms.results.length).map(result =>
                                    <div className={"card-wrapper"}>
                                        <div className={"card-template"} style={{backgroundImage: `linear-gradient(rgba(24, 48, 83, 0.5), rgb(24, 48, 83) 70%), url(${result.image_background})`}}>
                                            <div className={"card-header"}>
                                                <div className={"card-heading"}><a href={`platform/${result.id}`}className={"cat-link"}>{result.name}</a></div>
                                            </div>
                                            <div className={"card-info"}>
                                                <div className={"item-heading"}>Games</div>
                                                <ul className={"item-list"}>
                                                    {result.games.slice(0, 3).map(game =>
                                                        <li className={"item"}>
                                                            <a className={"game"} href={`games/${game.id}`}>{game.name.length > 20 ? game.name.substring(0,28): game.name}</a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                    </div>
                    <div className={"section-wrapper"}>
                        <div className={"section-header"}>
                            <div className={"section-heading"}>Developers</div>
                        </div>
                        <div className={"section-cards"}>

                            {info.developers.slice(0, info.developers.length).map(dev =>
                                <div className={"card-wrapper"}>
                                    <div className={"card-template"} style={{backgroundImage: `linear-gradient(rgba(24, 48, 83, 0.5), rgb(24, 48, 83) 70%), url(${dev.developed[0].screenshots[0].url.replace('t_thumb','t_720p')})`}}>
                                        <div className={"card-header"}>
                                            <div className={"card-heading"}><a href={`companies/${dev.id}`}className={"cat-link"}>{dev.name}</a></div>
                                        </div>
                                        <div className={"card-info"}>
                                            <div className={"item-heading"}>Games</div>
                                            <ul className={"item-list"}>
                                                {dev.developed.slice(0, 3).map(game =>
                                                    <li className={"item"}>
                                                        <a className={"game"} href={`games/${game.id}`}>{game.name.length > 28 ? `${game.name.substring(0,28)}...`: game.name}</a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={"section-wrapper"}>
                        <div className={"section-header"}>
                        <div className={"section-heading"}>Publishers</div>
                    </div>
                        <div className={"section-cards"}>

                            {info.publishers.slice(0, info.publishers.length).map(pub =>
                                <div className={"card-wrapper"}>

                                    <div className={"card-template"} style={{backgroundImage: `linear-gradient(rgba(24, 48, 83, 0.5), rgb(24, 48, 83) 70%), url(${pub.published[1].screenshots[0].url.replace('t_thumb', 't_720p')})`}}>
                                        <div className={"card-header"}>
                                            <div className={"card-heading"}><a href={`companies/${pub.id}`}className={"cat-link"}>{pub.name}</a></div>
                                        </div>
                                        <div className={"card-info"}>
                                            <div className={"item-heading"}>Games</div>
                                            <ul className={"item-list"}>
                                                {pub.published.slice(0, 3).map(game =>
                                                    <li className={"item"}>
                                                        <a className={"game"} href={`games/${game.id}`}>{game.name.length > 28 ? `${game.name.substring(0,28)}...`: game.name}</a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={"section-wrapper"}>
                        <div className={"section-header"}>
                            <div className={"section-heading"}>Genres</div>
                        </div>
                        <div className={"section-cards"}>

                            {info.genres.results.slice(0, info.genres.results.length).map(result =>
                                <div className={"card-wrapper"}>
                                    <div className={"card-template"} style={{backgroundImage: `linear-gradient(rgba(24, 48, 83, 0.5), rgb(24, 48, 83) 70%), url(${result.image_background})`}}>
                                        <div className={"card-header"}>
                                            <div className={"card-heading"}><a href={`genres/${result.id}`}className={"cat-link"}>{result.name}</a></div>
                                        </div>
                                        <div className={"card-info"}>
                                            <div className={"item-heading"}>Games</div>
                                            <ul className={"item-list"}>
                                                {result.games.slice(0, 3).map(game =>
                                                    <li className={"item"}>
                                                        <a className={"game"} href={`games/${game.id}`}>{game.name.length > 20 ? game.name.substring(0,28): game.name}</a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>



        )

    )
}

export default Browse