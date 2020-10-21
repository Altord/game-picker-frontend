import React from "react"
import Slider from "react-slick";
import ReactPlayer from 'react-player'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Carousel for general purpose use
const Carousel = ({videos, screenshots, artworks}) =>{
    var renderVideos = (videoArray) =>{
        return(videoArray.map(video=>(
            <div className={"gallery-item-cont"}>

                 <ReactPlayer controls={true} width={'320px'} height={'189px'} url={`https://www.youtube.com/watch?v=${video}`}/>
            </div>
        )))
    };
    var renderScreens = (screenShotArray) =>{
        return(screenShotArray.map(image=>(
            <div className={"gallery-item-cont"}>
                <img className={"gallery-item"} src={image} alt={"array"}/>
            </div>
        )))
    };
    var renderArt = (artworksArray) =>{
        return(artworksArray.map(image=>(
            <div className={"gallery-item-cont"}>
                <img className={"gallery-item"} src={image} alt={"array"}/>
            </div>
        )))
    };


    var settings = {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };



    return(
            <Slider className={"carousel-gallery"}{...settings}>

                {videos === undefined ? null : renderVideos(videos)}
                {screenshots === undefined ? null : renderScreens(screenshots)}
                {artworks === undefined ? null : renderArt(artworks)}
            </Slider>
    )
}

export default Carousel