import React, {useEffect, useState} from 'react';
import axios from "axios"
import './FrontPageSearch.scss'






const ReleasingSoon = () =>{
    const [information, setInformation] = useState([])

    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-soon',
            data: `limit: 1;`

        })

            .then(returnedResponse => setInformation(


                [{key: returnedResponse.data[0].game.id, name: returnedResponse.data[0].game.name, aggregated_rating: returnedResponse.data[0].game.aggregated_rating, cover: returnedResponse.data[0].game.cover.url ? returnedResponse.data[0].game.cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[1].game.id, name: returnedResponse.data[1].game.name, aggregated_rating: returnedResponse.data[1].game.aggregated_rating, cover: returnedResponse.data[1].game.cover.url ? returnedResponse.data[1].game.cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[2].game.id, name: returnedResponse.data[2].game.name, aggregated_rating: returnedResponse.data[2].game.aggregated_rating, cover: returnedResponse.data[2].game.cover.url ? returnedResponse.data[2].game.cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[3].game.id, name: returnedResponse.data[3].game.name, aggregated_rating: returnedResponse.data[3].game.aggregated_rating, cover: returnedResponse.data[3].game.cover.url ? returnedResponse.data[3].game.cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[4].game.id, name: returnedResponse.data[4].game.name, aggregated_rating: returnedResponse.data[4].game.aggregated_rating, cover: returnedResponse.data[4].game.cover.url ? returnedResponse.data[4].game.cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[5].game.id, name: returnedResponse.data[5].game.name, aggregated_rating: returnedResponse.data[5].game.aggregated_rating, cover: returnedResponse.data[5].game.cover.url ? returnedResponse.data[5].game.cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[6].game.id, name: returnedResponse.data[6].game.name, aggregated_rating: returnedResponse.data[6].game.aggregated_rating, cover: returnedResponse.data[6].game.cover.url ? returnedResponse.data[6].game.cover.url.replace("t_thumb", "t_cover_big") : null }]


                ,console.log(returnedResponse.data)))

            .catch(err => {
                console.error(err +" check maping");

            })
    },[])

//conditionally render the images/cover otherwise it'll end up being improper
    return(

        information.map(info=> <div className={"media-card"} key={info.key}><a className={"cover"} href={""}><img className={"image-loaded"} src={info.cover}/></a><a className={"title"} href={""}>{info.name}</a></div>)


    )

}


export default ReleasingSoon;


