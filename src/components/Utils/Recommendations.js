import React, {useEffect, useState} from "react"
import Slider from "react-slick";
import imageB from "../../images/icons/183a53.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
const RecomCarousel = ({themes, genres, gameId}) =>{

    //Set state
    const [information, setInformation] = useState([])
    useEffect(()=>{
        axios({
            method: 'post',
            url: `http://localhost:3001/games/rec`,
            data: {genres: genres, themes: themes, gameId: gameId}


        })
            //The axios response data being pushed to an array and then informations state being set by it
            .then(returnedResponse =>{
                let dataCopy = []
                //Bunch of looping to get desired information quickly
                //Push to array that will then have information set its state too
                for (let i = 0; i < 16; i++){
                    dataCopy.push({key: returnedResponse.data[0][i].id, name: returnedResponse.data[0][i].name, summary: returnedResponse.data[0][i].summary, aggregated_rating: returnedResponse.data[0][i].aggregated_rating, genres: returnedResponse.data[0][i].genres, platforms: returnedResponse.data[0][i].platforms, cover: returnedResponse.data[0][i].cover === undefined ? imageB : returnedResponse.data[0][i].cover.url ? returnedResponse.data[0][i].cover.url.replace("t_thumb", "t_cover_big") : null})
                }
                setInformation(dataCopy);


            })
            .catch(err => {
                console.error(err +" check maping or routes");

            })
    },[themes,genres,gameId])

    var renderRecs = (array) =>{
        return array.map(info=>(
            <div>
                <a className={"rec-cover"} href={`${info.key}`} id={`cover + ${info.key}`}  >
                    <img className={"recommend-img"} src={`${info.cover}`} alt={"cover"}/>
                    <div className={"rec-more-details"}>
                        <div  className={"rec-clearing"} id={`rec-clearing + ${info.key}`}  >

                            {info.summary === undefined ? null :
                                <p className={"summary"}
                                   id={`summary + ${info.key}`}>{`${info.summary.substring(0, 200)}...`}</p>
                            }

                        </div>


                    </div>
                </a>
                <div className={"rec-title"}><a  href={`${info.key}`}>{info.name}</a></div>
            </div>
        ))
    };



    var settings = {
        infinite: true,
        slidesToShow: 5,
    };


    return(
        <Slider className={"rec-gallery"} {...settings}>

            {renderRecs(information)}
        </Slider>
    )
}

export default RecomCarousel