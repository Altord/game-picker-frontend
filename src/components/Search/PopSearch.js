import React, {useEffect, useState} from 'react';
import axios from "axios"
import './FrontPageSearch.scss'


const PopSearch = ({mouseIn, mouseOut, emoji, color}) =>{
    const [information, setInformation] = useState([])
    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-popularity',
            data: `limit: 1;`

        })

            .then(returnedResponse =>{
                let dataCopy = []
                let colorCopy = []
                for (let i = 0; i < 7; i++){
                    dataCopy.push({key: returnedResponse.data[0][i].id, name: returnedResponse.data[0][i].name, aggregated_rating: returnedResponse.data[0][i].aggregated_rating, genres: returnedResponse.data[0][i].genres, platforms: returnedResponse.data[0][i].platforms, cover: returnedResponse.data[0][i].cover.url ? returnedResponse.data[0][i].cover.url.replace("t_thumb", "t_cover_big") : null, resColor: returnedResponse.data[1][i][0].SAC})
                }setInformation(dataCopy); console.log(dataCopy);
                colorCopy.push(information.resColor)
                return colorCopy
            })
            .catch(err => {
                console.error(err +" check maping or routes");

            })
    },[])

//conditionally render the images/cover otherwise it'll end up being improper
    return(
        //style={{color:`rgb(${info.resColor[0]},${info.resColor[1]},${info.resColor[2]})`}}
        information.map(info=>
            <div onMouseEnter={(evt)=>{mouseIn(evt, info.resColor)}} onMouseOut={mouseOut} className={"media-card"} key={info.key}  id={info.key}  >
                <a onMouseEnter={(evt)=>{mouseIn(evt,info.resColor)}} onMouseOut={mouseOut} className={"cover"} href={""} id={' '}  >
                    <img onMouseEnter={(evt)=>{mouseIn(evt,info.resColor)}} onMouseOut={mouseOut} className={"image-loaded"} src={info.cover}  id={info.key}  />
                    <div className={"more-details"}  id={info.key} >
                        <div className={"clearing"} id={info.key}  >
                            <div className={"rating"} id={info.key}  >
                                <p className={"rating-info"} id={info.key}  >{Math.round(info.aggregated_rating)}%</p>
                                <div className={"emoji"} id={info.key} >{emoji(Math.round(info.aggregated_rating))}</div>
                            </div>
                            {info.genres.slice(0,1).map((gen,index)=>
                                <div key={index} id={info.key}>
                                    <h2 className={"genre-info"}  id={info.key} >{gen.name}</h2>

                                </div>)}
                            {info.platforms.slice(0,2).map((plat,index)=>
                                <p  key={index} className={"platform-info"} id={info.key} >{plat.abbreviation}</p>


                            )}

                        </div>


                    </div>

                </a>
                <a onMouseEnter={(evt)=>{mouseIn(evt,info.resColor)}} onMouseOut={mouseOut} className={"title"} href={""} id={info.key}>{info.name} </a>
            </div>)


    )

}


export default PopSearch;


