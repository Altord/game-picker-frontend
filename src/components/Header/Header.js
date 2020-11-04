import React,{useState,useContext,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SearchBar from "../Search/SearchModal/SearchBar";
import {UserContext} from "../../Context/UserContextProvider"
import profile from "../../images/icons/astronaut(1).png"
import './header.scss'
import UserLogOut from "../User/Logout/Logout";

//Modal styles
const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
        height: '100vh',
        width: '100vw',
        position: 'fixed',

    },
    fadeInContent:{
        overflowY: 'auto'
    }

}));

//Header for navigation
const Header = () => {
    const classes = useStyles();
    //Set the search bar state (open/close)
    const [open, setOpen] = useState(false);
    //Set current userProfile from user data
    const {userData,setUserData} = useContext(UserContext)
    const token = localStorage.jwtToken;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    
    return(

            <nav className={"nav-container"} id={"nav-container"}>
                <div className={"wrap"}>
                        <a href={"https://www.igdb.com/discover"}><img className={"igdb-icon"} alt="" src={require('../../images/icons/IDGBicon.png')}/></a>
                        <div className={"links"}>
                                <Link to={"/"}>Home</Link>
                                <Link to={"/browse"}>Browse</Link>
                                <Link to={"/game-picker-main"}>Game Picker</Link>
                        </div>
                        <div className={"search"} onClick={handleOpen}>
                            <svg className={"svg-icon"} viewBox="0 0 20 20">
                                <path fill="none" d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
                            c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
                            c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
                            s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"></path>
                            </svg>
                        </div>
                    {token === undefined ?
                        ( <div className={"user"}>
                            <Link to={"/users/register"} className={"new"}>Sign Up</Link>
                            <Link to={"/users/login"}>Log In</Link>
                        </div>)
                        :
                        (<div className={"user"}>
                            <div><Link to={`/users/${userData.id}/profile`}><img className={"profile"} src={profile}/></Link></div>
                            <UserLogOut/>
                        </div>)
                    }


                    <Modal
                        className={classes.modal}
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={open}>
                            <SearchBar onClose={handleClose}/>
                        </Fade>

                    </Modal>
                </div>
            </nav>

    )
}

export default Header