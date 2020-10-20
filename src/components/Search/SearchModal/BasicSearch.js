import React, {useState, useEffect} from 'react';
import axios from "axios"
import SearchInformation from "./SearchInformation";

const BasicSearch = ({searchInfo}) => {
    const [information, setInformation] = useState([])

    useEffect(() => {
        const pullCall =  setTimeout(() =>{axios.post('http://localhost:3001/search', {searchValue: searchInfo}).then(res=>
            console.log(res.data)
        )}, 3000)





    }, [searchInfo])



    return(
        information.map(info=>
                <div className={"search-results"}>

                    <div className={"result-col"}><h3 className={'results-title'}>Games</h3>
                        <div className={'result'}>
                            <div>
                                <a href={`/game/gameid`}>
                                    <img src={''}/>
                                    <div className={'game-title'}>
                                        <div className={'game-category'}></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className={"result-col"}><h3 className={'results-title'}>Companies</h3>  hi</div>
                    <div className={"result-col"}><h3 className={'results-title'}>Character</h3> hi</div>
                    <div className={"result-col"}><h3 className={'results-title'}>Themes</h3> hi</div>
                    <div className={"result-col"}><h3 className={'results-title'}>Categories</h3> hello </div>
                    <div className={"result-col"}><h3 className={'results-title'}>Platform</h3> hello</div>
                </div>
        )

    )
}



export default BasicSearch
