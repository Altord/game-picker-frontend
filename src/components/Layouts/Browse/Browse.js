import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {CircleToBlockLoading} from 'react-loadingg'
import "./Browse.scss"

const Browse = () =>{
    const[information, setInfomation] = useState()
    useEffect(()=>{
        axios.post('http://localhost:3001/browse').then(res=>{
            let dataCopy = []
            dataCopy.push(res.data)
            console.log(dataCopy)
            setInfomation(dataCopy)
        })

    },[])

    return(

        information === undefined ? <CircleToBlockLoading/> : information.map(info=>
            <div className={"browse-page-content"}>
                <div className={"content-container"}>
                    <h1 className={"page-heading"}>Browse</h1>
                    <div className={"section-wrapper"}>
                        <div className={"section-header"}>
                            <div className={"section-heading"}>Platforms</div>
                        </div>
                            <div className={"section-cards"}>
                                {info[0].platforms.slice(0,info[0].platforms.length).map(plat=>
                                <div className={"card-wrapper"}>
                                    <div className={"card-template"}>
                                        <div className={"card-header"}>
                                            <div className={"card-heading"}><a className={"cat-link"}>{plat.name}</a></div>
                                        </div>
                                        <div className={"card-info"}>
                                            <div className={"item-heading"}>Popular Items</div>
                                            <ul className={"item-list"}>
                                                <li className={"item"}>
                                                    <a className={"game"}> Game Name</a>
                                                    <span className={"item-rating"}>89</span>
                                                </li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                        )}
                            </div>

                    </div>
                    <div className={"section-wrapper"}></div>
                    <div className={"section-wrapper"}></div>
                    <div className={"section-wrapper"}></div>
                    <div className={"section-wrapper"}></div>
                    <div className={"section-wrapper"}></div>

                </div>
            </div>



        )

    )
}

export default Browse