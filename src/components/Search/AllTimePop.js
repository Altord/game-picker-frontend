import React, {useEffect, useState} from 'react';
import axios from "axios"
import './FrontPageSearch.scss'



const Anticipated = () =>{
    const [information, setInformation] = useState([])

    useEffect(()=>{
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-anticipated',
            data: `limit: 1;`

        })

            .then(returnedResponse => setInformation(
                [{key: returnedResponse.data[0].id, name: returnedResponse.data[0].name, aggregated_rating: returnedResponse.data[0].aggregated_rating, cover: returnedResponse.data[0].cover ? returnedResponse.data[0].cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[1].id, name: returnedResponse.data[1].name, aggregated_rating: returnedResponse.data[1].aggregated_rating, cover: returnedResponse.data[1].cover ? returnedResponse.data[1].cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[2].id, name: returnedResponse.data[2].name, aggregated_rating: returnedResponse.data[2].aggregated_rating, cover: returnedResponse.data[2].cover ? returnedResponse.data[2].cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[3].id, name: returnedResponse.data[3].name, aggregated_rating: returnedResponse.data[3].aggregated_rating, release_dates: returnedResponse.release_dates, cover: returnedResponse.data[3].cover ? returnedResponse.data[3].cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[4].id, name: returnedResponse.data[4].name, aggregated_rating: returnedResponse.data[4].aggregated_rating, cover: returnedResponse.data[4].cover ? returnedResponse.data[4].cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[5].id, name: returnedResponse.data[5].name, aggregated_rating: returnedResponse.data[5].aggregated_rating, cover: returnedResponse.data[5].cover ? returnedResponse.data[5].cover.url.replace("t_thumb", "t_cover_big") : null },
                    {key: returnedResponse.data[6].id, name: returnedResponse.data[6].name, aggregated_rating: returnedResponse.data[6].aggregated_rating, cover: returnedResponse.data[6].cover ? returnedResponse.data[6].cover.url.replace("t_thumb", "t_cover_big") : null }]


                ,console.log(returnedResponse.data)))

            .catch(err => {
                console.error(err +" check maping");

            })
    },[])

//I need to conditionally render the images/cover otherwise it'll end up being improper
    return(

        information.map(info=> <div className={"media-card"} key={info.key}><a className={"cover"} href={""}><img className={"image-loaded"} src={info.cover}/></a><a className={"title"} href={""}>{info.name}</a></div>)


    )

}


export default Anticipated;


