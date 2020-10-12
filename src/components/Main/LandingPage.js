import React from 'react'
import './LandPage.scss'
import PopSearch from "../Search/PopSearch";
import Trending from "../Search/Trending";
import RecentlyReleased from "../Search/RecentlyReleased";
import Anticipated from "../Search/Anticipated";
import Top100 from "../Search/Top100";


//Mouseover events to change the colors of the text

const mouseInMain = (evt, resColor, key) =>{
    let title = document.getElementById(`title + ${key}`)
    let cover = document.getElementById(`cover + ${key}`)
    cover.style.boxShadow = `0 8px 6px -6px rgb(${resColor[0]},${resColor[1]},${resColor[2]})`
    title.style.color=`rgb(${resColor[0]},${resColor[1]},${resColor[2]})`
}
const mouseOutMain = (evt, key) =>{
    let title = document.getElementById(`title + ${key}`) // Grabs the ids
    let cover = document.getElementById(`cover + ${key}`)
    cover.style.boxShadow = `none`;
    title.style.color=`white`
}

const mouseIn100 = (evt, resColor, key) => {
    let title = document.getElementById(`title + ${key}`)
    title.style.color=`rgb(${resColor[0]},${resColor[1]},${resColor[2]})`
    title.style.transition= `.3s`

}
const mouseOut100 = (evt, key)=>{
    let title = document.getElementById(`title + ${key}`)
    title.style.color=`white`
}

const emojiDisplay = (rating, resColor, key)=>{
    let url = ''
    rating > 89 ? url= <svg  id={"best"} xmlns="http://www.w3.org/2000/svg"  fill="#F0E68C" width="22" height="22" viewBox="0 0 26 26"><path id={"best"} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 8c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm-3.499 4c-1.658 0-3.001 1.567-3.001 3.501 0 1.932 1.343 3.499 3.001 3.499 1.656 0 2.999-1.567 2.999-3.499 0-1.934-1.343-3.501-2.999-3.501z"/></svg>
        : rating > 75 ? url = <svg id={"great"} xmlns="http://www.w3.org/2000/svg"  fill="#00FF00" width="22" height="22" viewBox="0 0 26 26"><path id={"great"} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 14h-12c.331 1.465 2.827 4 6.001 4 3.134 0 5.666-2.521 5.999-4zm-9.5-6c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg>
        : rating > 50 ? url = <svg id={"ok"} xmlns="http://www.w3.org/2000/svg" fill="orange" width="22" height="22" viewBox="0 0 26 26"><path id={"ok"} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4 17h-8v-2h8v2zm-7.5-9c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5z"/></svg>
        : rating < 51 ? url= <svg id={"trash"} xmlns="http://www.w3.org/2000/svg" fill="red" width="22" height="22" viewBox="0 0 26 26"><path  id={"trash"} d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 8c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm7 0c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5-.672-1.5-1.5-1.5zm-.941 9.94c-.903-.19-1.741-.282-2.562-.282-.819 0-1.658.092-2.562.282-1.11.233-1.944-.24-2.255-1.015-.854-2.131 1.426-3.967 4.816-3.967 3.537 0 5.666 1.853 4.817 3.968-.308.769-1.136 1.249-2.254 1.014zm-2.563-1.966c1.614 0 3.056.67 3.206.279.803-2.079-7.202-2.165-6.411 0 .138.377 1.614-.279 3.205-.279z"/></svg>
        : url=''
    return url;
}


//The main page, what's shown when a user isn't logged in
const LandingPage = () =>{

    return(
        <div className={"page-content"}>
            <div className={"wrap"}>
                <div className={"preview"}>
                    <div className={"content-container"} id={"content-container"}>
                        <div className={"base-landing"} id={"base-landing"}>
                            <div className={"landing-section popular-30"}>
                                <div className={"title link"}><a><h3>Popular</h3></a><div className={"expand"}>View All</div></div>
                                <div className={"results"}>
                                    <PopSearch mouseIn={mouseInMain} mouseOut={mouseOutMain} emoji={emojiDisplay} />
                                </div>

                            </div>
                            <div  className={"landing-section trending"}>
                                <div className={"title link"}><a><h3>Trending</h3></a><div className={"expand"}>View All</div></div>
                                <div className={"results"}>
                                    <Trending mouseIn={mouseInMain} mouseOut={mouseOutMain} emoji={emojiDisplay}/>
                                </div>
                            </div>
                            <div  className={"landing-section upcomming"}>
                                <div className={"title link"}><a><h3>Recently Released</h3></a><div className={"expand"}>View All</div></div>
                                <div className={"results"}>
                                    <RecentlyReleased mouseIn={mouseInMain} mouseOut={mouseOutMain} emoji={emojiDisplay}/>
                                </div>
                            </div>
                            <div  className={"landing-section all-time-pop"}>
                                <div className={"title link"}><a><h3>Anticipated</h3></a><a className={"expand"}>View All</a></div>
                                <div className={"results"}>
                                    <Anticipated mouseIn={mouseInMain} mouseOut={mouseOutMain} emoji={emojiDisplay}/>
                                </div>
                            </div>
                            <div  className={"top-100"}>
                                <div className={"title link"}><a><h3>Top 100</h3></a><a className={"expand"}>View All</a></div>
                                <div className={"top-100-results"}>
                                    <Top100 emoji={emojiDisplay} mouseIn={mouseIn100} mouseOut={mouseOut100}/>
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