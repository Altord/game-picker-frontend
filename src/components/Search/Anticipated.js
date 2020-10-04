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

            .then(returnedResponse =>{
                let copy = []
                for (var i = 0; i < 7; i++){
                    copy.push({key: returnedResponse.data[i].id, name: returnedResponse.data[i].name, aggregated_rating: returnedResponse.data[i].aggregated_rating, cover: returnedResponse.data[i].cover.url ? returnedResponse.data[i].cover.url.replace("t_thumb", "t_cover_big") : null })
                }setInformation(copy)})

            .catch(err => {
                console.error(err +" All Time Pop");

            })
    },[])

//I need to conditionally render the images/cover otherwise it'll end up being improper
    return(

        information.map(info=> <div className={"media-card"} key={info.key}><a className={"cover"} href={""}><img className={"image-loaded"} src={info.cover}/></a><a className={"title"} href={""}>{info.name}</a></div>)


    )

}


export default Anticipated;


