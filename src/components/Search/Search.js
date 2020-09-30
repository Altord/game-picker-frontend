import React, {useState} from 'react';
import axios from "axios"
import SearchInformation from "../Search/SearchInformation";
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
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-requests',
            data: {
                searchValue
            }
        })

            .then(returnedResponse =>
                setInformation({
                    name: information.name = returnedResponse.data[0].name,
                    platforms: information.platforms = returnedResponse.data[0].platforms.map(p=><div>{p.abbreviation}</div>),
                    genres: information.genres = returnedResponse.data[0].genres.map(g => <div>{g.name}</div>),
                    score: information.score = Math.round(returnedResponse.data[0].aggregated_rating),
                    cover: information.cover = returnedResponse.data[0].cover ? returnedResponse.data[0].cover.url.replace("t_thumb", "t_cover_big") : null
                },console.log(returnedResponse.data[0])))
            .catch(err => {
                console.error(err +" fix this you dipshit");

            })
    }


    return(
        <div>
            <form className="search">
                <input type="text" value={searchValue} onChange={handleChange}/>
                <input type="submit" onClick={handleSubmit} value="SEARCH" />
            </form>
            <div>

            </div>
        </div>
    )
}



export default BasicSearch
