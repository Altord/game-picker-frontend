import React, {useState, useEffect} from 'react';
import axios from "axios"
import useDebounce from "../../Utils/Debouncer";
import { RotateCircleLoading } from 'react-loadingg';
import './basicsearch.scss'

const BasicSearch = ({searchInfo}) => {
    const [information, setInformation] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const debouncedSearchTerm = useDebounce(searchInfo, 500);
    useEffect (()=>{
        const pullCall =  () =>{axios.post('http://localhost:3001/search', {searchValue: searchInfo}).then(res=> {
            setInformation(res.data)
            setIsSearching(false)
            console.log(res.data)
        })}
            if(debouncedSearchTerm){
                setIsSearching(true)
                pullCall()
            }else{
                if (searchInfo === ""){
                    setInformation([])

                }

            }

        },[debouncedSearchTerm])





    return(
        searchInfo === "" ? [] :
            isSearching === true ? <RotateCircleLoading color={'#00bfff'}/>  :
        information.map(info=>
                <div className={"search-results"}>
                    {info.games.length === 0 ? [] :
                        <div className={"result-col"}><h3 className={'results-title'}>Games</h3>
                            {info.games.slice(0,info.games.length).map((gameInfo, index)=>
                                <div className={'result-game'}>
                                        <a className={"search-details"} href={`/games/${gameInfo.id}`}>
                                            <img className={'result-image'} src={`${gameInfo.cover === undefined ? require('../../../images/icons/gamepad.png') : gameInfo.cover.url}`}/>
                                            <div className={'result-game-title'}>
                                                {gameInfo.name}
                                                <div className={'game-category'}>
                                                    {gameInfo.genres === undefined ? [] : gameInfo.genres.slice(0,2).map((genre)=><span>{genre.name}</span>)}
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
                    <div className={"result-col"}><h3 className={'results-title'}>Companies</h3>
                        {info.companies.slice(0,info.companies.length).map((companyInfo, index)=>
                            <div className={"result-company"}>
                                <a className={"search-details"} href={`/companies/${companyInfo.id}`}>
                                    <img className={'result-image'} src={`${companyInfo.logo === undefined ? require('../../../images/icons/building.png') : companyInfo.logo.url}`}/>
                                    <div className={'result-game-title'}>
                                        {companyInfo.name}
                                        <div className={'game-category'}>
                                            <span>{companyInfo.start_date === undefined ? [] : new Date(companyInfo.start_date * 1000).toLocaleDateString("en-US")}</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>}
                    {info.characters.length === 0 ? [] :
                    <div className={"result-col"}><h3 className={'results-title'}>Character</h3>
                        {info.characters.slice(0,info.characters.length).map((characterInfo, index)=>
                            <div className={"result-company"}>
                                <a className={"search-details"} href={`/companies/${characterInfo.id}`}>
                                    <img className={'result-image'} src={`${characterInfo.mug_shot === undefined ? require('../../../images/icons/moustache.png') : characterInfo.mug_shot.url}`}/>
                                    <div className={'result-game-title'}>
                                        {characterInfo.name}
                                        <div className={'game-category'}>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        )}
                    </div>}
                </div>
        )

    )
}



export default BasicSearch
