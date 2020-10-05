import React from 'react'
import './LandPage.scss'
import PopSearch from "../Search/PopSearch";
import NewTrendSearch from "../Search/NewTrendingSearch";
import RecentlyReleased from "../Search/RecentlyReleased";
import Anticipated from "../Search/Anticipated";
import FastAverageColor from 'fast-average-color/dist/index.es6';


//Mouseover events to change the colors of the text

const mouseIn = (evt) =>{
    let element = evt.target
    let mediaCard = document.getElementById('media-card')
    let imageLoaded = document.getElementById('image-loaded')
    let title = document.getElementById("title")
    const fac = new FastAverageColor();
    fac.getColorAsync("https://w.wallhaven.cc/full/5w/wallhaven-5we787.jpg")
        .then(function(color) {
            title.style.color= color.hex;
            console.log(color)
            imageLoaded.style.boxShadow = "0 8px 6px -6px blue";
        })
        .catch(function(e) {
            console.log(e);
        })


}
const mouseOut = (evt) =>{
    let element = evt.target
    let mediaCard = document.getElementById('media-card')
    let imageLoaded = document.getElementById('image-loaded')
    let title = document.getElementById("title")
    title.style.color = 'white';
    imageLoaded.style.boxShadow = "0 8px 6px -6px black";



}
const emojiDisplay = (rating)=>{
    let url = ''
    rating > 90 ? url= <svg xmlns="http://www.w3.org/2000/svg"  fill="#F0E68C" width="22" height="22" viewBox="0 0 26 26"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 8c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm-3.499 4c-1.658 0-3.001 1.567-3.001 3.501 0 1.932 1.343 3.499 3.001 3.499 1.656 0 2.999-1.567 2.999-3.499 0-1.934-1.343-3.501-2.999-3.501z"/></svg>
        : rating > 70 ? url = <svg xmlns="http://www.w3.org/2000/svg"  fill="#00FF00" width="22" height="22" viewBox="0 0 26 26"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-12c.331 1.465 2.827 4 6.001 4 3.134 0 5.666-2.521 5.999-4zm-9.5-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg>
        : rating > 50 ? url = <svg xmlns="http://www.w3.org/2000/svg" fill="orange" width="22" height="22" viewBox="0 0 26 26"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 17h-8v-2h8v2zm-7.5-9c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg>
        : url = <svg xmlns="http://www.w3.org/2000/svg" fill="red" width="22" height="22" viewBox="0 0 26 26"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 8c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm-.941 9.94c-.903-.19-1.741-.282-2.562-.282-.819 0-1.658.092-2.562.282-1.11.233-1.944-.24-2.255-1.015-.854-2.131 1.426-3.967 4.816-3.967 3.537 0 5.666 1.853 4.817 3.968-.308.769-1.136 1.249-2.254 1.014zm-2.563-1.966c1.614 0 3.056.67 3.206.279.803-2.079-7.202-2.165-6.411 0 .138.377 1.614-.279 3.205-.279z"/></svg>
    return url;
}



//Fast average color component for text and image background color
/*
fac.getColorAsync(container.querySelector('img'))
    .then(function(color) {
        document.body.style.backgroundColor = color.rgba;
        document.body.style.color = color.isDark ? '#fff' : '#000';
    })
    .catch(function(e) {
        console.log(e);
    });
*/

//The main page, what's shown when a user isn't logged in
const LandingPage = () =>{

    return(
        <div className={"page-content"}>
            <div className={"wrap"}>
                <div className={"preview"}>
                    <div className={"content-container"}>
                        <div className={"base-landing"}>
                            <div className={"landing-section trending"}>
                                <a className={"title link"} href={""}><h3>Popular</h3><div className={"expand"}>View All</div></a>
                                    <div className={"results"}>
                                        <PopSearch mouseIn={mouseIn} mouseOut={mouseOut} emoji={emojiDisplay} />
                                    </div>

                            </div>
                            <div  className={"landing-section popular-30"}>
                                <a className={"title link"}  href={""}><h3>Trending Now</h3></a>
                                    <div className={"results"}>
                                        <NewTrendSearch/>
                                    </div>
                            </div>
                            <div  className={"landing-section upcomming"}>
                                <a className={"title link"} href={""}>Recently Released</a>
                                    <div className={"results"}>
                                            <RecentlyReleased/>
                                    </div>
                            </div>
                            <div  className={"landing-section all-time-pop"}>
                                <a className={"title link"} href={""}>Most Anticipated</a>
                                    <div className={"results"}>
                                        <Anticipated/>
                                    </div>
                            </div>
                            <div  className={"top-100"}>
                                <a className={"title link"} href={""}>Top 100</a>
                                    <div className={"results"}>

                                    </div>
                            </div>
                    </div>

                </div>





                </div>
            </div>
        </div>
    )
}

export default LandingPage;