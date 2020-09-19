import React, {useState,useEffect} from 'react';
import axios from "axios";
import createNewApi from "../API/api";
import BasicInformation from "../Main/basic-info";
const BasicSearch = () => {
    const [searchValue, setSearchValue] = useState('')
    const [information, setInformation] = useState({
        name: '',
        platforms: '',
        genres: '',
        involved_companies: '',
        cover: '',
    })
    const handleChange = (evt) => {
        setSearchValue(evt.target.value)
        console.log(searchValue)
    }
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const info = "fields name,genres.*,platforms.*,aggregated_rating,cover.*;" +
        `search "${searchValue}";` + 'limit: 1;'

        createNewApi
            .create(info)

            .then(returnedResponse =>
                setInformation({
                    name: information.name = returnedResponse[0].name,
                    platforms: information.platforms = returnedResponse[0].platforms.map(p=><div>{p.abbreviation}</div>),
                    genres: information.genres = returnedResponse[0].genres.map(g => <div>{g.name}</div>),
                    score: information.score = Math.round(returnedResponse[0].aggregated_rating),
                    cover: information.cover = returnedResponse[0].cover ? returnedResponse[0].cover.url.replace("t_thumb", "t_cover_big") : null
                }, console.log(returnedResponse)))
            .catch(err => {
                console.error(err +"fix this you dipshit");

            })
    }


    return(
        <div>
            <form className="search">
                <input type="text" value={searchValue} onChange={handleChange}/>
                <input type="submit" onClick={handleSubmit} value="SEARCH" />
            </form>
            <div>
                <BasicInformation {...information}/>
            </div>
        </div>
    )
}



export default BasicSearch
