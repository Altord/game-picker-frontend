import React, {useEffect, useState} from 'react'
import axios from 'axios'

const GameHome = ({match}) =>{
    const {
        params: { gameId },
    } = match;
    const [information, setInformation] = useState([])
    useEffect(()=>{
        axios({
            method: 'post',
            url: `http://localhost:3001/games/id`,
            data: {gameId: gameId}


        })

            .then(returnedResponse =>{
                let dataCopy = []
                let colorCopy = []
                dataCopy.push({key: returnedResponse.data[0][0].id, name: returnedResponse.data[0][0].name, summary: returnedResponse.data[0][0].summary, aggregated_rating: returnedResponse.data[0][0].aggregated_rating, genres: returnedResponse.data[0][0].genres, platforms: returnedResponse.data[0][0].platforms, cover: returnedResponse.data[0][0].cover.url ? returnedResponse.data[0][0].cover.url.replace("t_thumb", "t_cover_big") : null, resColor: returnedResponse.data[1][0][0].SAC})

                console.log(dataCopy)
                setInformation(dataCopy);
                colorCopy.push(information.resColor)
            })
            .catch(err => {
                console.error(err +" check maping or routes");

            })
    },[gameId])

    return(
        <div>

        </div>
    )

}

export default GameHome