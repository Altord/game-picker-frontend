import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CircleToBlockLoading} from 'react-loadingg'
import imageB from "../../../images/icons/gamepad.png"
import building from "../../../images/icons/building.png"
import './CompanyMain.scss'
// Displays main company information


const GameMain = ({match}) =>{
    // Captures the id and send it to the backend
    const {
        params: {companyId},
    } = match;
    //Set state
    const [information, setInformation] = useState([])
    useEffect(() => {
        let dataCopy = []
             axios.post('http://localhost:3001/companies/id', {companyId})
            .then(res=>{
                dataCopy.push(res.data[0])
                setInformation(dataCopy);
            })
    }, [companyId]);


    let mediaWebsiteLookup = {
        1 : <img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/external-link-symbol.png")}/>,
        2 : <img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/wikia_logo.png")}/>,
        3 : <img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/wikipedia.png")}/>,
        4 : <img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/facebook-icon.svg")}/>,
        5 : <img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/twitter.png")}/>,
        6 : <img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/twitch.png")}/>,
        8 : <img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/instagram.png")}/>,
        9 : <img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/youtube.png")}/>,
        14 :<img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/Reddit-Icon.png")}/>,
        18 :<img alt={"website logo"} className={"website-logo"} src={require("../../../images/company_logos/discord-seeklogo.com.svg")}/>
    }
    let shopWebsiteLookup = {
        10 : <img alt={"website logo"}className={"website-logo "} src={require("../../../images/company_logos/app-store.png")}/>,
        12 : <img alt={"website logo"}className={"website-logo"} src={require("../../../images/company_logos/google-play.png")}/>,
        13 : <img alt={"website logo"}className={"website-logo"} src={require("../../../images/company_logos/steam_logo.png")}/>,
        15 : <img alt={"website logo"}className={"website-logo"} src={require("../../../images/company_logos/itchio_logo.png")}/>,
        16 : <img alt={"website logo"}className={"website-logo"} src={require("../../../images/company_logos/epicgames_logo.png")}/>,
        17 : <img alt={"website logo"}className={"website-logo"} src={require("../../../images/company_logos/gog_logo.jpg")}/>
    }

    return(
        //Initial rendering of the page
        information.length === 0 ? <CircleToBlockLoading/> :
            information.map(info=>
                <div className={"company-page-content"}>
                    {console.log(information)}
                    <div className={"company-header-wrap"}>
                        <div className={"banner"} style={{backgroundImage: 'url(https://w.wallhaven.cc/full/96/wallhaven-965258.jpg)'}}></div>
                        <div className={"header"}>
                            <img className={"company-logo"} src={info.logo === undefined ? building : info.logo.url.replace('t_thumb','t_logo_med').replace('jpg','png')}/>
                            <div className={"company-name"}>{info.name}</div>
                            <div className={"company-date"}>Founded {info.created_at === undefined ? [] : (new Date(info.created_at*1000).toLocaleDateString())}</div>
                        </div>

                    </div>
                    <div className={"company-content-wrapper"}>
                        <div className={"summary"}>
                            {info.description === undefined ? [] : info.description}

                        </div>
                        {info.developed === undefined ? [] :
                            <div className={"developed"}>
                                <span className={"title"}>Developed Games</span>
                                {info.developed.slice(0,5).map(game=>
                                    <div className={"game-container"}>
                                        <a>
                                            <img className={"cover"} src={game.cover === undefined ? imageB : game.cover.url.replace("t_thumb","t_1080p")} alt={"published cover"}></img>
                                            <div>{game.name}</div>
                                            <div>{game.summary}</div>
                                            {game.genres === undefined ? [] :
                                                <div className={"data-set"} >
                                                    <div className={"type"}>Genres</div>
                                                    <div className={"value"}>{game.genres.slice(0,game.genres.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                                </div>

                                            }
                                        </a>


                                    </div>
                                )}
                            </div>
                        }
                        {info.published === undefined ? [] :
                            <div className={"published"}>
                                <span className={"title"}>Published Games</span>
                                {info.published.slice(0,5).map(game=>
                                    <div className={"game-container"}>
                                        <a>
                                            <img className={"cover"} src={game.cover === undefined ? imageB : game.cover.url.replace("t_thumb","t_1080p")} alt={"published cover"}></img>
                                            <div>{game.name}</div>
                                            <div>{game.summary}</div>
                                            {game.genres === undefined ? [] :
                                                <div className={"data-set"} >
                                                    <div className={"type"}>Genres</div>
                                                    <div className={"value"}>{game.genres.slice(0,game.genres.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                                </div>

                                            }
                                        </a>


                                    </div>
                                )}

                            </div>
                        }
                    </div>
                </div>
            )
    )

}

export default GameMain