import React from 'react'
import axios from "axios"
const client = process.env.REACT_APP_IGDB_API_KEY


const create = (info) => {
    const request =
        axios({
            url: "https://polar-temple-75375.herokuapp.com/https://api-v3.igdb.com/games",
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'user-key': client
            },
                data: info

            },[])
    return request.then(response=>(response.data))

}





export default {create};
