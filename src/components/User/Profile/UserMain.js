import React,{useContext,useState, useEffect} from 'react';
import {UserContext} from "../../../Context/UserContextProvider"; 
import {CircleToBlockLoading} from 'react-loadingg'
import './UserMain.scss'
import profile from "../../../images/icons/astronaut(1).png"

import axios from 'axios';

const UserProfile = () =>{
        //Import userdata from context
       const {userData} = useContext(UserContext)
       const [gameList, setGameList] = useState([]);
       //Set the gameList displayed from userData games
       useEffect(()=>{
              setGameList(userData.games)
       },[userData])
        //Filter the list depending on which button clicked and assign style depending on ID
       let filterCall = (event) =>{
           let filter = event.target
           let filterClass = document.getElementsByClassName("filter-options")
           const notFocused = {
               backgroundColor: "",
               transform: "scale(1.0)",
               color: 'rgb(159,173,189)',
               boxShadow:'none'
           }
           const focused={
               backgroundColor: "#274e88",
               transform: "scale(1.1)",
               color: 'white',
               boxShadow: 'box-shadow: 0px 1px 13px 4px rgba(0,0,0,0.27);'
           }
           let filterClassArray = [].slice.call(filterClass)

            filterClassArray.forEach(item=>{
                if (item.id !== filter.id){
                    Object.assign(item.style, notFocused)
                }
            })
           if (filterClass.namedItem(filter.id).id === filter.id){
                Object.assign(filter.style, focused)
            }

           let filterList = []
           userData.games.forEach((game)=>{
                 if(game.status === event.target.textContent){
                        setGameList([])
                        filterList.push(game)
                        return filterList
                 }else if(event.target.textContent === 'All'){
                        setGameList([])
                        filterList.push(game)
                        return(filterList)
                 }

             })
            setGameList(filterList)

       }

       return(
       //Wait for gamelist to be populated
       gameList === undefined ? <CircleToBlockLoading/> : 
        <div>
               <div className={"user-container"}>
                    <div className={"header-wrap"}>
                           <div className={"banner"}>
                                   <div className={"shadow"}/>
                                   <div className={"banner-container"}>
                                          <div className={"banner-content"}>
                                                 <img className={"avatar"} src={profile}/>
                                                 <div className={"user-name"}>{userData.name}</div>
                                          </div>
                                   </div>
                                   
                           </div>
                           <div className={"breaker"}/>
                    </div>
                    <div className={"content-container"}>
                           <div className={"inner-content"}>
                            {gameList === [] ? <div>There's no games here! Browse the site and add a game to see what happens.</div> : 
                            <div className={"list-container"}>
                                         <div className={"list-wrap"}>
                                                <div className={"filters"}>
                                                                    <div className={"filter-options"} id={"filter-all"} onClick={filterCall}>All</div>
                                                                      <div className={"filter-options"} id={"filter-plan"} onClick={filterCall}>Planning</div>
                                                                      <div className={"filter-options"} id={"filter-play"} onClick={filterCall}>Playing</div>
                                                                      <div className={"filter-options"} id={"filter-played"} onClick={filterCall}>Played</div>
                                                                      <div className={"filter-options"} id={"filter-dropped"} onClick={filterCall}>Dropped</div>
                                                               </div>

                                                <div className={"list-section"}>
                                                        <div className={"list-header"}>
                                                                <div className={"list-cover"}></div>
                                                               <div className={"list-title"}>Title</div>
                                                               <div className={"list-score"}>Score</div>
                                                               <div className={"list-status"}>Status</div>
                                                        </div>
                                                        <div className={"list-entries"}>
                                                            {/* Map out the actual gameList*/}
                                                            { gameList === undefined ? [] :
                                                                 gameList.map(game=>

                                                                     <a href={`/games/${game.gameId}`}><div className={"entry-row"}>
                                                                             <div className={"entry-cover"}><img src={game.gameCover.replace("t_cover_big", "t_thumb")}/></div>
                                                                             <div className={"entry-title"}>{game.gameTitle}</div>
                                                                             <div className={"entry-score"}>{Math.round(game.score)}</div>
                                                                             <div className={"entry-status"}>{game.status}</div>
                                                                      </div></a>
                                                                   )
                                                           }
                                                        </div>
                                                 </div>
                                         </div>
                                         
                                  </div>
                            
                            
                            }                           
                                  
                           </div>
                    </div>
          
               </div>
        </div> 
 )

}

export default UserProfile;