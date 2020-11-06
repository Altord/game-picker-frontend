import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CircleToBlockLoading} from 'react-loadingg'
import imageB from "../../../images/icons/gamepad.png"
import building from "../../../images/icons/building.png"
import './CompanyMain.scss'
// Displays main company information

//Change the backgrounds of each game on hover
const backgroundHoverDev = (event, key) =>{
    let background = document.getElementById('background-image dev' + key)
    let gameContainer = document.getElementById('game-container dev' + key)
    const backgroundStyles  = {
        opacity: '1',
        backgroundSize: '1920px 1080px'
    }
    const gameStyles = {

        border: 'deepskyblue solid 1px',
    }
    Object.assign(gameContainer.style, gameStyles)
    Object.assign(background.style, backgroundStyles)

}
//Reverse it on out
const backgroundClearDev = (event, key) =>{
    let background = document.getElementById('background-image dev' + key)
    let gameContainer = document.getElementById('game-container dev' + key)

    const backgroundStyles  = {
        opacity: '0'
    }
    const gameStyles = {
        boxShadow: 'none',
        border: 'none'
    }
    Object.assign(background.style, backgroundStyles)
    Object.assign(gameContainer.style, gameStyles)

}
const backgroundHoverPub = (event, key) =>{
    let background = document.getElementById('background-image pub' + key)
    let gameContainer = document.getElementById('game-container pub' + key)
    const backgroundStyles  = {
        opacity: '1',
        backgroundSize: '1920px 1080px'
    }
    const gameStyles = {
        boxShadow: '0 8px 6px -6px black',
        border: 'deepskyblue solid 1px',
    }
    Object.assign(gameContainer.style, gameStyles)
    Object.assign(background.style, backgroundStyles)

}
const backgroundClearPub = (event, key) =>{
    let background = document.getElementById('background-image pub' + key)
    let gameContainer = document.getElementById('game-container pub' + key)

    const backgroundStyles  = {
        opacity: '0'
    }
    const gameStyles = {
        boxShadow: 'none',
        border: 'none'
    }
    Object.assign(background.style, backgroundStyles)
    Object.assign(gameContainer.style, gameStyles)

}

//Render component
const CompanyMain = ({match}) =>{
    // Captures the id and send it to the backend
    const {
        params: {companyId},
    } = match;
    //Set state
    const [information, setInformation] = useState([])
    //Call the api
    useEffect(() => {
        let dataCopy = []
             axios.post('http://localhost:3001/companies/id', {companyId})
            .then(res=>{
                dataCopy.push(res.data[0])
                setInformation(dataCopy);
            })
    }, [companyId]);

    return(
        //Initial rendering of the page
        information.length === 0 ? <CircleToBlockLoading/> :
            information.map(info=>
                <div className={"company-page-content"}>
                    <div className={"company-header-wrap"}>
                        <div className={"banner"} style={{backgroundImage: 'url(https://w.wallhaven.cc/full/96/wallhaven-965258.jpg)'}}></div>
                        <div className={"header"}>
                            <img className={"company-logo"} src={info.logo === undefined ? building : info.logo.url.replace('t_thumb','t_logo_med').replace('jpg','png')}/>
                            <div className={"company-name"}>{info.name}</div>
                            <div className={"company-date"}>Founded {info.created_at === undefined ? [] : (new Date(info.created_at*1000).toLocaleDateString())}</div>
                        </div>

                    </div>
                    <div className={"company-content-wrapper"}>
                        {info.description === undefined ? [] : <div className={"summary"}>{info.description}</div>}

                        {info.developed === undefined ? [] :
                            <div className={"games"}>
                                <div className={"title"}>Developed Games</div>
                                {info.developed.slice(0,5).map(game=>
                                    <a href={`/games/${game.id}`}>
                                        <div className={"background-image"} id={'background-image dev' + game.id} style={{background: `url(${(game.screenshots === undefined ? [] : game.screenshots[0].url.replace('t_thumb','t_1080p'))}) no-repeat`}}/>
                                        <div className={"background-static"}/>
                                        <div className={"game-container"} id={'game-container dev' + game.id} onMouseLeave= {(evt)=>{backgroundClearDev(evt,game.id,game)}} onMouseEnter={(evt)=>{backgroundHoverDev(evt,game.id)}}>

                                            <img className={"cover"} src={game.cover === undefined ? imageB : game.cover.url.replace("t_thumb","t_1080p")} alt={"published cover"}></img>
                                            <div className={"game-info"}>
                                                <div className={"game-title"}>{game.name}</div>
                                                {game.genres === undefined ? [] :
                                                    <div className={"data-set"} >
                                                        <div className={"value"}>{game.genres.slice(0,game.genres.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                                    </div>

                                                }
                                                {game.summary === undefined ? [] : <div className={"game-summary"}> {game.summary.substring(0,500)}</div>}
                                            </div>

                                        </div>
                                    </a>

                                )}
                            </div>
                        }
                        {info.published === undefined ? [] :
                            <div className={"games"}>
                                <span className={"title"}>Published Games</span>
                                {info.published.slice(0,5).map(game=>
                                    <a href={`/games/${game.id}`}>
                                        <div className={"background-image"} id={'background-image pub' + game.id} style={{background: `url(${(game.screenshots === undefined ? [] : game.screenshots[0].url.replace('t_thumb','t_1080p'))}) no-repeat`}}/>
                                        <div className={"background-static"}/>
                                        <div className={"game-container"} id={'game-container pub' + game.id} onMouseLeave= {(evt)=>{backgroundClearPub(evt,game.id,game)}} onMouseEnter={(evt)=>{backgroundHoverPub(evt,game.id)}}>

                                            <img className={"cover"} src={game.cover === undefined ? imageB : game.cover.url.replace("t_thumb","t_1080p")} alt={"published cover"}></img>
                                            <div className={"game-info"}>
                                                <div className={"game-title"}>{game.name}</div>
                                                {game.genres === undefined ? [] :
                                                    <div className={"data-set"} >
                                                        <div className={"value"}>{game.genres.slice(0,game.genres.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                                    </div>

                                                }
                                                {game.summary === undefined ? [] : <div className={"game-summary"}> {game.summary.substring(0,500)}</div>}


                                            </div>
                                        </div>
                                    </a>

                                )}

                            </div>
                        }
                    </div>
                </div>
            )
    )

}

export default CompanyMain