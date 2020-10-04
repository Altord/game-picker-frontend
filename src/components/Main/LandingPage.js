import React from 'react'
import './LandPage.scss'
import PopSearch from "../Search/PopSearch";
import NewTrendSearch from "../Search/NewTrendingSearch";
import RecentlyReleased from "../Search/RecentlyReleased";
import Anticipated from "../Search/Anticipated";
import FastAverageColor from 'fast-average-color';


//Mouseover events to change the colors of the text

const mouseIn = (evt) =>{
    let colorChange = 'blue'
    let element = evt.target
    element.style.color = colorChange;
    element.hidden = false

}
const mouseOut = (evt) =>{
    let element = evt.target
    element.style.color = 'white';
}




//Fast average color component for text and image background color
/*const fac = new FastAverageColor();
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
                                        <PopSearch mouseIn={mouseIn} mouseOut={mouseOut} />
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