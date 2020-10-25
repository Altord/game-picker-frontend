import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CircleToBlockLoading} from 'react-loadingg'
import Carousel from "../../Utils/Carousel";
import RecomCarousel from "../../Utils/Recommendations";
import imageB from "../../../images/icons/gamepad.png"
import './GameMain.scss'
// Displays main game information


const GameMain = ({match}) =>{
    // Captures the id and send it to the backend
    const {
        params: {gameId},
    } = match;
    //Set state
    const [information, setInformation] = useState([])
    useEffect(() => {
        async function fetchData() {
            const returnedResponse = await axios.post('http://localhost:3001/games/id', {gameId});
            const game = returnedResponse.data[0][0];
            const res = await axios.post('http://localhost:3001/games/rec/articles', {gameName: game.name});
            console.log(game)
            let dataCopy = [];
            let articlesArray = [];


            if (res.data.results) {
                articlesArray = res.data.results;
            }
            const videosArray = game.videos === undefined ? [] : game.videos.map(video => video.video_id);
            const screenShotArray = game.screenshots === undefined ? [] : game.screenshots.map(screenshot => screenshot.url.replace("t_thumb","t_1080p"))
            const artWorkArray = game.artworks === undefined ? [] : game.artworks.map(artwork => artwork.url.replace("t_thumb","t_1080p"))
            dataCopy.push({
                age: game.age_ratings,
                artworks: artWorkArray,
                articles: articlesArray,
                franchises: game.franchises,
                date: new Date(game.first_release_date * 1000),
                involved_companies: game.involved_companies,
                storyline: game.storyline ,
                themes : game.themes ,
                total_rating : game.total_rating ,
                videos : videosArray,
                key: game.id,
                name: game.name,
                similar_games: game.similar_games,
                summary: game.summary,
                screenShots: screenShotArray,
                cover: game.cover === undefined ? imageB : game.cover.url ? game.cover.url.replace("t_thumb", "t_cover_big") : [],
                aggregated_rating: game.aggregated_rating,
                genres: game.genres,
                platforms: game.platforms,
                websites: game.websites,
            });

            console.log(dataCopy)
            setInformation(dataCopy);
        }

        fetchData();

    }, [gameId]);

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
            <div className={"game-page-content"}>
                {console.log(information)}
                <div className={"header-wrap"}>
                    {info.screenShots.length === 0 ? <div className={"banner"} style={{backgroundImage: `url(https://w.wallhaven.cc/full/45/wallhaven-453xr1.jpg)`}}/> :
                    <div className={"banner"} style={{backgroundImage: `url(${info.screenShots[0]})`}}/>}
                    <div className={"header"}>
                        <div className={"container"}>
                            <div className={"cover-wrap overelap-banner"}>
                                <div className={"cover-wrap-inner"}>
                                    <img src={info.cover} className={"cover"} alt={"cover"}/>
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
                            {info.franchises === undefined ? [] :
                                <div className={"data-set"}>
                                    <div className={"type"}>Franchises</div>
                                    <div className={"value"}>{info.franchises.slice(0,info.franchises.length).map(names=>names.name)}</div>
                                </div>
                            }
                            {info.involved_companies === undefined ? [] :
                                    <div className={"data-set"}>
                                        <div className={"type"}>Companies</div>
                                        <div className={"value"}>{info.involved_companies.slice(0,info.involved_companies.length).map(names=>
                                            <a className={"link"} href={`/companies/${names.company.id}`}>
                                                {names.company.name.replace(/,(?=[^,]*$)/ ,"\n")}
                                            </a>)
                                        }</div>
                                    </div>
                            }
                            {info.platforms === undefined ? []:
                                <div className={"data-set"}>
                                    <div className={"type"}>Platforms</div>
                                    <div className={"value"}>{info.platforms.slice(0,info.platforms.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                </div>
                            }
                            {info.date === "Invalid Date" ? [] :
                                <div className={"data-set"} >
                                    <div className={"type"}>Release Date</div>
                                    <div className={"value"} >{(info.date).toLocaleDateString('en-US',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                            }
                            {info.themes === undefined ? [] :
                                <div className={"data-set"}>
                                    <div className={"type"}>Themes</div>
                                    <div className={"value"}>{info.themes.slice(0,info.themes.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                </div>

                            }
                            {info.genres === undefined ? [] :
                                <div className={"data-set"} >
                                    <div className={"type"}>Genres</div>
                                    <div className={"value"}>{info.genres.slice(0,info.genres.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                </div>

                            }
                            {info.websites === undefined ? [] :
                                <div>
                                    <div className={"media-websites"}>
                                        {info.websites.slice(0,info.websites.length).map((website,index)=>
                                            website.category in mediaWebsiteLookup ?
                                                    <div className={"website-container external"} key={`${index}`}>
                                                        <a href={website.url} target={"_blank"}>{mediaWebsiteLookup[website.category]}</a>
                                                    </div> : [])
                                        }
                                    </div>
                                    <div className={"shop-websites"}>
                                        {info.websites.slice(0,info.websites.length).map((website, index)=>
                                           website.category in shopWebsiteLookup ?
                                               <div>

                                                   <div className={"website-container buy"} key={`${index}`}>
                                                       <a href={website.url} target={"_blank"}> {shopWebsiteLookup[website.category]}</a>
                                                   </div>
                                               </div>
                                               : [])}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={"overview"}>
                        {info.videos.length + info.artworks.length + info.screenShots.length < 3 ? [] :
                            <div className={"carousel-container"}>
                                {info.videos.length === 0 && info.artworks.length === 0 && info.screenShots.length === 0 ? [] :
                                    <div>
                                        <div className={"cat-title"}>Gallery</div>
                                        <Carousel videos={info.videos} screenshots={info.screenShots}
                                                  artworks={info.artworks}/>
                                    </div>
                                }
                            </div>
                        }


                        <div className={"storyline-container"}>
                            {info.storyline === undefined ? [] :
                                <div>
                                    <div className={"cat-title"}>Storyline</div>
                                    <div className={"body-text"} >{info.storyline}</div>
                                </div>
                            }

                        </div>
                        <div className={"articles-container"}>

                            {info.articles.length === 0 ? [] :
                                <div className={"articles-container"}>
                                    <div className={"signifyer-holder"}>
                                        <div className={"cat-title"}>News (GameSpot)</div>

                                    </div>
                                    {info.articles.slice(0,4).map((articles, index)=>
                                        <a className={"article-container"} href={articles.site_detail_url} target={"_blank"}>
                                            {console.log(articles)}
                                            <img src={articles.image.square_small} alt={'news-cover'}></img>
                                            <div className={"art-info"}>
                                                <div className={"art-title"}>{articles.title}</div>
                                                <div className={"art-brief"}>{articles.deck}</div>
                                            </div>
                                            <div className={"pub-info"}>
                                                <div className={"auth-name"}>{articles.authors}</div>
                                                <div className={"pub-date"}>{articles.publish_date}</div>
                                            </div>
                                        </a>

                                    )}
                                </div>
                            }

                        </div>

                            <div className={"rec-container"}>

                                <div className={"cat-title"}>Recommendations</div>
                                <RecomCarousel themes={info.themes} genres={info.genres}  gameId={info.key}/>


                            </div>


                    </div>
                </div>
            </div>
        )




    )

}

export default GameMain