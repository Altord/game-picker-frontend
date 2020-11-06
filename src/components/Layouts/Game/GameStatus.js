import React,{useState,useEffect,useContext,useRef} from 'react';
import axios from 'axios'
import {UserContext} from "../../../Context/UserContextProvider";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
const GameStatus = ({gameInfo}) => {
    //To run function only when the app is mounted
    const isMounted = useRef(false);
    //Saving the status
    const [status,setStatus] = useState('')
    //Saving the status and delaying the render
    const [focusedStatus,setFocusedStatus] = useState('');
    //Calling user data
    const {userData} = useContext(UserContext)
    //Anchor for the menu
    const [anchorEl, setAnchorEl] = useState(null);
    //Call for the request to backend
    const userCall = () => (axios.post('http://localhost:3001/users/games/status', {userData, editedGameInfo, status}))
    
    const editedGameInfo = {
        gameTitle: gameInfo.name,
        gameCover: gameInfo.cover,
        gameId: gameInfo.key,
        score: gameInfo.aggregated_rating,
    }
    //Material ui menu
    const StyledMenu = withStyles({
        paper: {
           
            background: '#183053'

        },
    })((props) => (<Menu elevation={0} getContentAnchorEl={null} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }} transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}{...props}/>));const StyledMenuItem = withStyles((theme) => ({
        root: {
            '&:hover': {
                backgroundColor: 'deepSkyBlue',
            },
            background: '#183053',
            color: '#e8ebef',
            width: '200px',
            fontSize: '1.5rem'
        },
    }))(MenuItem);


    const menuClick = (event)=>{
        setAnchorEl(event.currentTarget)

    }
    //Event for when a menu item is pressed
    const handleStatusClose =(event)=>{
        setAnchorEl(null)
        setStatus(event.currentTarget.textContent)
        setFocusedStatus(event.currentTarget.textContent)
        let userGames = userData.games;
        userGames.forEach((game)=>{
            if(game.gameId === editedGameInfo.gameId){
                game.status=status;

            }
        })

    }
    //Clicking anywhere else when menu is open
    const handleClose = () =>{
        setAnchorEl(null)

    }
    //Setting the focused game based on userData game (if present)
    useEffect(()=>{
        if(userData.games !== undefined){
            userData.games.forEach((game)=>{
                if(game.gameId === gameInfo.key){
                    setFocusedStatus(game.status)
                }
            })
        }

    },[])
    useEffect(()=>{
        if(isMounted.current){
            userCall().then(res=>{
                const{token} = res.data;
                localStorage.setItem('games', token)
                console.log(userData)
            }).catch(err=>console.log(err))
        }else{
            isMounted.current=true}

    },[status])

    return(
        <div className={"actions"}>
            <div className={"list"} onClick={menuClick}>
                {focusedStatus === '' || focusedStatus === undefined?
                <div className={"add"} >Add to List</div>
                    : <div className={"add"}>{focusedStatus}</div>
                }
                <div className={"dropdown"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="white" height="24" viewBox="0 0 24 24"><path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z"/></svg>
                </div>
            </div>
            <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={handleStatusClose}>Planning</StyledMenuItem>
                <StyledMenuItem onClick={handleStatusClose}>Playing</StyledMenuItem>
                <StyledMenuItem onClick={handleStatusClose}>Played</StyledMenuItem>
                <StyledMenuItem onClick={handleStatusClose}>Dropped</StyledMenuItem>
            </StyledMenu>
            
        </div>
    )
}

export default GameStatus