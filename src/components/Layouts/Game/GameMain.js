import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './GameMain.scss'
import Carousel from "../../Utils/Carousel";
import RecomCarousel from "../../Utils/Recommendations";
import imageB from "../../../images/icons/183a53.png"

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
            const websiteCatArray = game.websites === undefined ? [] : game.websites.map(website => website.category)
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
                summary: game.summary,
                screenShots: screenShotArray,
                cover: game.cover === undefined ? imageB : game.cover.url ? game.cover.url.replace("t_thumb", "t_cover_big") : null,
                aggregated_rating: game.aggregated_rating,
                genres: game.genres,
                platforms: game.platforms,
                websites: game.websites,
                websiteCategory: websiteCatArray,
            });
            console.log(dataCopy)
            setInformation(dataCopy);
        }

        // since we just defined the function, now call it
        fetchData();
    }, [gameId]);


    return(
        //Initial rendering of the page
        information.length === 0 ? <div>hello</div> : !("articles" in information[0]) ? null :
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
                            {info.date === "Invalid Date" ? null :
                                <div className={"data-set"} >
                                    <div className={"type"}>Release Date</div>
                                    <div className={"value"} >{(info.date).toLocaleDateString('en-US',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                            }
                            {info.themes === undefined ? null :
                                <div className={"data-set"}>
                                    <div className={"type"}>Themes</div>
                                    <div className={"value"}>{info.themes.slice(0,info.themes.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                </div>

                            }
                            {info.genres === undefined ? null :
                                <div className={"data-set"} >
                                    <div className={"type"}>Genres</div>
                                    <div className={"value"}>{info.genres.slice(0,info.genres.length).map(names=>`${names.name},`.replace(/,(?=[^,]*$)/ ,"\n"))}</div>
                                </div>

                            }
                            {info.websites === undefined ? null :
                                <div>
                                    <div className={"media-websites"}>

                                        {info.websites.slice(0,info.websites.length).map((website,index)=>
                                            website.category === 1
                                                ?
                                                <div className={"website-container external"} key={`${index}`}>
                                                    <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/external-link-symbol.png")}/></a>
                                                </div>
                                                :
                                                website.category === 2
                                                    ?
                                                    <div className={"website-container wikia"} key={`${index}`}>
                                                        <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/wikia_logo.png")}/></a>
                                                    </div>
                                                    :
                                                    website.category === 3
                                                        ?
                                                        <div className={"website-container wiki"} key={`${index}`}>
                                                            <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/wikipedia.png")}/></a>
                                                        </div>
                                                        :
                                                        website.category === 4
                                                            ?
                                                            <div className={"website-container facebook"} key={`${index}`}>
                                                                <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/facebook-icon.svg")}/></a>
                                                            </div>
                                                            :
                                                            website.category === 5
                                                                ?
                                                                <div className={"website-container twitter"} key={`${index}`}>
                                                                    <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/twitter.png")}/></a>
                                                                </div>
                                                                :
                                                                website.category === 6
                                                                    ?
                                                                    <div className={"website-container twitch"} key={`${index}`}>
                                                                        <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/twitch.png")}/></a>
                                                                    </div>
                                                                    :
                                                                    website.category === 8
                                                                        ?
                                                                        <div className={"website-container instagram"} key={`${index}`}>
                                                                            <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/instagram.png")}/></a>
                                                                        </div>
                                                                        :
                                                                        website.category === 9
                                                                            ?
                                                                            <div className={"website-container youtube"} key={`${index}`}>
                                                                                <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/youtube.png")}/></a>
                                                                            </div>
                                                                            :
                                                                            website.category === 14
                                                                                ?
                                                                                <div className={"website-container reddit"} key={`${index}`}>
                                                                                    <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/Reddit-Icon.png")}/></a>
                                                                                </div>
                                                                                :
                                                                                website.category === 18
                                                                                    ?
                                                                                    <div className={"website-container discord"} key={`${index}`}>
                                                                                        <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/discord-seeklogo.com.svg")}/></a>
                                                                                    </div>
                                                                                    : null
                                        )}
                                    </div>
                                    <div className={"shop-websites"}>

                                        {info.websites.slice(0,info.websites.length).map((website, index)=>
                                            website.category === 10
                                                ?

                                                    <div className={"website-container apple"} key={`${index}`}>
                                                        <a href={website.url}> <img className={"website-logo "} src={require("../../../images/company_logos/app-store.png")}/></a>
                                                    </div>

                                                :
                                                website.category === 12
                                                    ?

                                                        <div className={"website-container google"} key={`${index}`}>
                                                            <a href={website.url}> <img className={"website-logo"} src={require("../../../images/company_logos/google-play.png")}/> </a>
                                                        </div>

                                                    :
                                                    website.category === 13
                                                        ?
                                                            <div className={"website-container steam"} key={`${index}`}>
                                                                <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/steam_logo.png")}/> </a>
                                                            </div>

                                                        :
                                                        website.category === 15
                                                            ?
                                                            <div className={"website-container itch"} key={`${index}`}>
                                                                <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/itchio_logo.png")}/></a>
                                                            </div>
                                                            :
                                                            website.category === 16
                                                                ?
                                                                <div className={"website-container epic"} key={`${index}`}>
                                                                    <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/epicgames_logo.png")}/></a>
                                                                </div>
                                                                :
                                                                website.category === 17
                                                                    ?
                                                                    <div className={"website-container gog"} key={`${index}`}>
                                                                        <a href={website.url}><img className={"website-logo"} src={require("../../../images/company_logos/gog_logo.jpg")}/></a>
                                                                    </div>
                                                                    :
                                                                    null









                                        )}
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
                            {info.storyline === undefined ? null :
                                <div>
                                    <div className={"cat-title"}>Storyline</div>
                                    <div className={"body-text"} >{info.storyline}</div>
                                </div>
                            }

                        </div>
                        <div className={"articles-container"}>
                            {console.log(info.articles)}

                            {info.articles.length === 0 ? console.log('hello') : console.log('this one works')}

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