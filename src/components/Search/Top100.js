import {useEffect, useState} from "react";
import axios from "axios";

const Top100 = ({mouseIn, mouseOut, emoji}) => {
    const [information, setInformation] = useState([])
    useEffect(() => {
        axios({
            method: 'post',
            url: 'http://localhost:3001/api-router-popularity',
            data: `limit: 1;`

        })

            .then(returnedResponse => {
                let dataCopy = []
                let colorCopy = []
                for (let i = 0; i < 7; i++) {
                    dataCopy.push({
                        key: returnedResponse.data[0][i].id,
                        name: returnedResponse.data[0][i].name,
                        summary: returnedResponse.data[0][i].summary,
                        aggregated_rating: returnedResponse.data[0][i].aggregated_rating,
                        genres: returnedResponse.data[0][i].genres,
                        platforms: returnedResponse.data[0][i].platforms,
                        cover: returnedResponse.data[0][i].cover.url ? returnedResponse.data[0][i].cover.url.replace("t_thumb", "t_cover_big") : null,
                        resColor: returnedResponse.data[1][i][0].SAC
                    })
                }
                setInformation(dataCopy);
                colorCopy.push(information.resColor)
            })
            .catch(err => {
                console.error(err + " check maping or routes");

            })
    }, [])
    return (
        information.map(
            <div>


            </div>

        )


        )
}