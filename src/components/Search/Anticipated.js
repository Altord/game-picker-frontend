import React, {useEffect, useState} from 'react';
import axios from "axios"
import './FrontPageSearch.scss'



const Anticipated = ({mouseIn, mouseOut, emoji}) =>{
    const [information, setInformation] = useState([])
    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-anticipated',
            data: `limit: 1;`

        })

            .then(returnedResponse =>{
                let dataCopy = []
                let colorCopy = []
                for (let i = 0; i < 7; i++){
                    dataCopy.push({key: returnedResponse.data[0][i].id, name: returnedResponse.data[0][i].name, summary: returnedResponse.data[0][i].summary, aggregated_rating: returnedResponse.data[0][i].aggregated_rating, genres: returnedResponse.data[0][i].genres, platforms: returnedResponse.data[0][i].platforms, cover: returnedResponse.data[0][i].cover.url ? returnedResponse.data[0][i].cover.url.replace("t_thumb", "t_cover_big") : null, resColor: returnedResponse.data[1][i][0].SAC})
                }
                setInformation(dataCopy);
                console.log(dataCopy)
                colorCopy.push(information.resColor)
            })
            .catch(err => {
                console.error(err +" check maping or routes");

            })
    },[])

//conditionally render the images/cover otherwise it'll end up being improper
    return(
        information.map(info=>
            <div onMouseEnter={(evt)=>{mouseIn(evt, info.resColor, info.key)}} className={"media-card"} key={info.key}  id={`media-card + ${info.key}`}  >
                <a className={"cover"} href={""} id={`cover + ${info.key}`}  >
                    <img className={"image-loaded"} src={info.cover}  id={`image-loaded + ${info.key}`}/>
                    <div onMouseEnter={(evt)=>{mouseIn(evt, info.resColor, info.key)}} onMouseLeave={(evt)=>{mouseOut(evt,info.key)}} className={"more-details"}  id={`more-details + ${info.key}`} >
                        <div  className={"clearing"} id={`clearing + ${info.key}`}  >
                            <div className={"rating"} id={`rating + ${info.key}`}  >
                                <p className={"rating-info"} id={`rating-info + ${info.key}`} >{info.aggregated_rating !== undefined ? `${Math.round( info.aggregated_rating)}%` : 'Unrated'}</p>
                                <div className={"emoji"} id={`emoji + ${info.key}`} >{emoji(Math.round(info.aggregated_rating),info.resColor, info.key)}</div>
                            </div>
                            {info.genres.slice(0,1).map((gen,index)=>
                                <div key={index} id={"gen-index"}>
                                    <h2 className={"genre-info"} id={`genre-info + ${info.key}`}>{gen.name}</h2>
                                </div>)}
                            {info.platforms.slice(0,2).map((plat,index)=>
                                <div key={index} id={"plat-index"}>
                                    <p key={index} className={"platform-info"} id={`plat + ${info.key}`}>{plat.abbreviation}</p>
                                </div>
                            )}
                            <p className={"summary"} id={`summary + ${info.key}` }>{`${info.summary.substring(0,200)}...`}</p>


                        </div>


                    </div>

                </a>
                <a onMouseEnter={(evt)=>{mouseIn(evt, info.resColor, info.key)}} onMouseOut={(evt)=>{mouseOut(evt,info.key)}} className={"title"} href={""} id={`title + ${info.key}`}>{info.name} </a>
            </div>)


    )

}


export default Anticipated;


