import React, {useEffect, useState} from 'react';
import axios from "axios"
import './FrontPageSearch.scss'






const RecentlyReleased = () =>{
    const [information, setInformation] = useState([])

    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-soon',
            data: `limit: 1;`

        })


            .then(returnedResponse =>{
                let copy = []
                for (var i = 0; i < 7; i++){
                       copy.push({key: returnedResponse.data[i].game.id, name: returnedResponse.data[i].game.name, aggregated_rating: returnedResponse.data[i].game.aggregated_rating, cover: returnedResponse.data[i].game.cover.url ? returnedResponse.data[i].game.cover.url.replace("t_thumb", "t_cover_big") : null })
                }setInformation(copy)})
            .catch(err => {
                console.error(err +" Recently Released");

            })
    },[])

//conditionally render the images/cover otherwise it'll end up being improper
    return(

        information.map(info=> <div className={"media-card"} key={info.key}><a className={"cover"} href={""}><img className={"image-loaded"} src={info.cover}/></a><a className={"title"} href={""}>{info.name}</a></div>)


    )

}


export default RecentlyReleased;