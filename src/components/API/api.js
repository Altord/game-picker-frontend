import React, {useState , useEffect} from 'react'
import axios from "axios"


export const HandleBasicInfo = () => {
    const client = process.env.REACT_APP_IGDB_API_KEY

    const [information, setInformation] = useState({
            name: '',
            platforms: '',
            genres: '',
            involved_companies: '',
            cover: '',
    })
    const [searchValue, setSearchValue] = useState('')

    const handleSubmit = (evt) => {
        evt.preventDefault();
        apiSearch(searchValue)
        setSearchValue('')
    }
        const apiSearch = searchValue => {
            const fetchData = async () => {
                axios({
                    url: "https://polar-temple-75375.herokuapp.com/https://api-v3.igdb.com/games",
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'user-key': client
                    },
                    data: "fields name,genres.*,platforms,aggregated_rating,cover.*;" +
                        `search "${searchValue}";` + 'limit: 1;' // Grabbing the basic info, setting search result limit to 1
                        //`search "${query}";`
                       })
                    .then(response => {
                        setInformation({
                            name: information.name = response.data[0].name,
                            platforms: information.platforms = response.data[0].platforms,
                            genres: information.genres = response.data[0].genres.map(g => g.name),
                            score: information.score = Math.round(response.data[0].aggregated_rating),
                            cover: information.cover = response.data[0].cover ? response.data[0].cover.url.replace("t_thumb", "t_cover_big"): null
                        })
                        console.log(response.data[0])
                    })
                    .catch(err => {
                        console.error(err);

                    });}

            fetchData();
          }


    return(
        <div>
            <div>
                <div>
                    <form className="search">
                        <input
                            value={searchValue}
                            onChange={e => setSearchValue(e.target.value)}
                            type="text"
                        />
                        <input onClick={handleSubmit} type="submit" value="SEARCH" />
                    </form>
                </div>

                <div><img src={information.cover}/></div>

                {information.name}
                <div>
                    {information.score} {information.genres[0]}

                </div>
                {information.genres[1]}
            </div>
        </div>
    )
}




function Example () {
    return (
        <div>
            <p>
                <HandleBasicInfo/>
            </p>
        </div>
    );
}


export default Example;
