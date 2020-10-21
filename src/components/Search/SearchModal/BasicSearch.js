import React, {useState, useEffect} from 'react';
import axios from "axios"
import useDebounce from "../../Utils/Debouncer";
import './BasicSearch.scss'

const BasicSearch = ({searchInfo}) => {
    const [information, setInformation] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const debouncedSearchTerm = useDebounce(searchInfo, 500);
    console.log(searchInfo)
    useEffect (()=>{
        const pullCall =  () =>{axios.post('http://localhost:3001/search', {searchValue: searchInfo}).then(res=> {
            setIsSearching(false)
            setInformation(res.data)
            console.log(information)
        })}
            if(debouncedSearchTerm){
                setIsSearching(true);
                pullCall()
            }else{
                if (searchInfo === ""){
                    setInformation([])
                }

            }

        },[debouncedSearchTerm])





    return(
        searchInfo === "" ? [] :
        information.map(info=>
                <div className={"search-results"}>
                    {info.games.length === 0 ? [] :
                        <div className={"result-col"}><h3 className={'results-title'}>Games</h3>
                            {info.games.slice(0,info.games.length).map((gameInfo, index)=>

                                <div className={'result'}>
                                    {console.log(gameInfo)}

                                        <a className={"search-details"} href={`/games/${gameInfo.id}`}>
                                            <img className={'result-image'} src={`${gameInfo.cover === undefined ? require('../../../images/icons/gamepad.png') : gameInfo.cover.url}`}/>
                                            <div className={'result-game-title'}>
                                                {gameInfo.name}
                                                <div className={'game-category'}>
                                                    <span>{gameInfo.date}</span>
                                                    {gameInfo.genres === undefined ? [] : gameInfo.genres.slice(0,2).map((genre)=><span>{genre.name}</span>)}
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div className={'result-extra'}>
                                                <div className={'result-score'}>{gameInfo.aggregated_rating === undefined || gameInfo.aggregated_rating === 0  ? [] : `${Math.round(gameInfo.aggregated_rating)}/100`}</div>
                                                <div className={'result-date'}></div>
                                            </div>
                                        </a>

                                </div>


                            )}

                        </div>
                    }
                    {info.companies.length === 0 ? [] :
                    <div className={"result-col"}><h3 className={'results-title'}>Companies</h3>  hi</div>}
                    {info.characters.length === 0 ? [] :
                    <div className={"result-col"}><h3 className={'results-title'}>Character</h3> hi</div>}
                    {info.themes.length === 0 ? [] :
                    <div className={"result-col"}><h3 className={'results-title'}>Themes</h3> hi</div>}
                    {info.franchises === 0 ? [] :
                    <div className={"result-col"}><h3 className={'results-title'}>Franchises</h3> hello </div> }
                    {info.platforms === 0 ? [] :
                    <div className={"result-col"}><h3 className={'results-title'}>Platform</h3> hello</div>}
                </div>
        )

    )
}



export default BasicSearch
