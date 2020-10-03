import React from 'react'
import './LandPage.scss'
import PopSearch from "../Search/PopSearch";
import NewTrendSearch from "../Search/NewTrendingSearch";
import AllTimePop from "../Search/AllTimePop";
import ReleasingSoon from "../Search/ReleasingSoon";
import Anticipated from "../Search/AllTimePop";

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
                                        <PopSearch/>
                                    </div>

                            </div>
                            <div  className={"landing-section popular-30"}>
                                <a className={"title link"}  href={""}>Trending Now</a>
                                    <div className={"results"}>
                                        <NewTrendSearch/>
                                    </div>
                            </div>
                            <div  className={"landing-section upcomming"}>
                                <a className={"title link"} href={""}>Recently Released</a>
                                    <div className={"results"}>
                                            <ReleasingSoon/>
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