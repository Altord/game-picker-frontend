import React, {useEffect, useState} from 'react';
import axios from "axios"
import './SearchModal/FrontPageSearch.scss'
import LoaderMapped from "../Utils/SkeletonBasic";
import imageB from '../../images/icons/183a53.png'





const RecentlyReleased = ({mouseIn, mouseOut, emoji}) =>{
    const [information, setInformation] = useState([])
    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-soon',
            data: `limit: 1;`

        })

            .then(returnedResponse =>{
                let dataCopy = []
                let colorCopy = []
                for (let i = 0; i < 7; i++){
                    dataCopy.push({key: returnedResponse.data[0][i].game.id, name: returnedResponse.data[0][i].game.name, summary: returnedResponse.data[0][i].game.summary, aggregated_rating: returnedResponse.data[0][i].game.aggregated_rating, genres: returnedResponse.data[0][i].game.genres, platforms: returnedResponse.data[0][i].game.platforms, cover: returnedResponse.data[0][i].game.cover.url ? returnedResponse.data[0][i].game.cover.url.replace("t_thumb", "t_cover_big") : null, resColor: returnedResponse.data[1][i][0].SAC})
                }
                setInformation(dataCopy);
                colorCopy.push(information.resColor)
            })
            .catch(err => {
                console.error(err +" check maping or routes");

            })
    },[])

//conditionally render the images/cover otherwise it'll end up being improper
    return(
        information.length === 0 ? <LoaderMapped/> :
        information.map(info=>
            <div onMouseEnter={(evt)=>{mouseIn(evt, info.resColor, info.key)}} onMouseLeave={(evt)=>{mouseOut(evt,info.key)}} className={"media-card"} key={info.key}  id={`media-card + ${info.key}`}  >
                <a className={"cover"} href={`games/${info.key}`} id={`cover + ${info.key}`}  >
                    <img className={"image-loaded"} src={info.cover}  id={`image-loaded + ${info.key}`}/>
                    <div onMouseEnter={(evt)=>{mouseIn(evt, info.resColor, info.key)}} onMouseLeave={(evt)=>{mouseOut(evt,info.key)}} className={"more-details"}  id={`more-details + ${info.key}`} >
                        <div  className={"clearing"} id={`clearing + ${info.key}`}  >
                            <div className={"rating"} id={`rating + ${info.key}`}  >
                                <p className={"rating-info"} id={`rating-info + ${info.key}`} >{info.aggregated_rating !== undefined ? `${Math.round( info.aggregated_rating)}%` : 'Unrated'}</p>
                                <div className={"emoji"} id={`emoji + ${info.key}`} >{emoji(Math.round(info.aggregated_rating),info.resColor, info.key)}</div>
                            </div>
                            {info.genres === undefined ? <div key={info.key} id={"gen-index"}>
                                <h2 className={"genre-info"} id={`genre-info + ${info.key}`}></h2>
                            </div>
                                : info.genres.slice(0,1).map((gen,index)=>
                                <div key={index} id={"gen-index"}>
                                    <h2 className={"genre-info"} id={`genre-info + ${info.key}`}>{gen.name === undefined ? `Unknown`: gen.name}</h2>
                                </div>)}
                            {info.platforms.slice(0,2).map((plat,index)=>
                                <div key={index} id={"plat-index"}>
                                    <p key={index} className={"platform-info"} id={`plat + ${info.key}`}>{plat.abbreviation}</p>
                                </div>
                            )}
                            {info.summary === undefined ? null :
                                <p className={"summary"}
                                   id={`summary + ${info.key}`}>{`${info.summary.substring(0, 200)}...`}</p>
                            }

                        </div>


                    </div>

                </a>
                <a onMouseEnter={(evt)=>{mouseIn(evt, info.resColor, info.key)}} onMouseOut={(evt)=>{mouseOut(evt,info.key)}} className={"title"} href={`games/${info.key}`} id={`title + ${info.key}`}>{info.name} </a>
            </div>)


    )

}



export default RecentlyReleased;