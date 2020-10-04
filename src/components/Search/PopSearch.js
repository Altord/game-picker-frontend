import React, {useEffect, useState} from 'react';
import axios from "axios"
import './FrontPageSearch.scss'


const PopSearch = ({mouseIn, mouseOut, colorGrabber}) =>{
    const [information, setInformation] = useState([])

    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-popularity',
            data: `limit: 1;`

        })

            .then(returnedResponse =>{
                let copy = []
                for (var i = 0; i < 7; i++){
                    copy.push({key: returnedResponse.data[i].id, name: returnedResponse.data[i].name, aggregated_rating: returnedResponse.data[i].aggregated_rating, cover: returnedResponse.data[i].cover.url ? returnedResponse.data[i].cover.url.replace("t_thumb", "t_cover_big") : null })
                }setInformation(copy)})

            .catch(err => {
                console.error(err +" check maping or routes");

            })
    },[])

//conditionally render the images/cover otherwise it'll end up being improper
    return(

        information.map(info=>
            <div className={"media-card"} key={info.key}>
                <a className={"cover"} href={""}>
                    <img className={"image-loaded"} src={info.cover}/>
                    <div className={"more-details"}>
                        <h2 className={"basic-info"}>Hello</h2>

                    </div>
                </a>
                <a onMouseEnter={mouseIn} onMouseLeave={mouseOut} className={"title"} href={""}>{info.name}</a>
            </div>)


    )

}


export default PopSearch;


