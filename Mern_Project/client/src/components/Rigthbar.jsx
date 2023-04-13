import {
    Avatar,
    AvatarGroup,
    Box,
    Divider,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@mui/material";
import React from 'react'
import { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import { allUsersRoute} from "../utils/APIRoutes";
const Rightbar = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    
  
    useEffect( ()=>{
      const navigationTo = async () => {
        if (!localStorage.getItem('userLogedIn'))
        {
          navigate("/login");
        }
        else {
          setCurrentUser(await JSON.parse(localStorage.getItem('userLogedIn')));
          setIsLoaded(true);
        }
      }
      navigationTo();
     }, []);
    useEffect( () => {
        const getCurrentUser = async()=>{
          if( currentUser)  {
          
            const data = await  axios.get(`${allUsersRoute}/${currentUser._id}`);
;
            setUsers(data.data);
          
        }
        }
          getCurrentUser();
      }, [currentUser]);
    return (
        <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
            <Box position="fixed" width={300}>

                <List>


                    <Typography variant="h5" fontWeight={400} mt={2}>
                        The Travelers
                    </Typography>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                        {users &&
                            users.map((user) =>
                                user._id !== currentUser._id ? (

                                    <div key={user._id} >
                                        <ListItem alignItems="flex-start"    sx={{ display: 'flex' ,   alignItems:'center'}} >
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={user.image} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={<Link to={`/profile/${user._id}`}                style={{ textDecoration: 'none', color: 'GoldenRod' }} >  {user.firstName} {user.lastName}       </Link>}
                                                // secondary={
                                                //     <React.Fragment>
                                                //         <Typography
                                                //             sx={{ display: 'inline' }}
                                                //             component="span"
                                                //             variant="body2"
                                                //             color="text.primary"
                                                //         >

                                                //         </Typography>
                                                //         {/* {"I'll be in your neighborhood doing errands this…"} */}
                                                //     </React.Fragment>
                                                // }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />

                                    </div>

                                ) : null
                            )}

                    </List>

                </List>
            </Box>
        </Box>
    );
};

export default Rightbar;
