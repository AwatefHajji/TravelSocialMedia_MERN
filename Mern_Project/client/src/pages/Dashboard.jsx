import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import Navbar from './Navbar';
import Rightbar from '../components/Rigthbar';
import AddPost from '../components/AddPost';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import { getAllPostsRoute } from '../utils/APIRoutes';
function Dashboard() {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const navigationTo = async () => {
      if (!localStorage.getItem('userLogedIn')) {
        navigate("/login");
      }
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem('userLogedIn')));
        setIsLoaded(true);
      }
    }
    navigationTo();
  }, []);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if(currentUser){
    axios
      .get(getAllPostsRoute)
      .then((res) => {
        setPosts(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    }
  }, [currentUser]);
  const addNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };
  return (
    <div>
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />

        <Box sx={{ width: 700 }}   >
          <AddPost onAddPost={addNewPost} />
          <Feed posts={posts} setPosts={setPosts} />
        </Box>

        <Rightbar />
      </Stack>
    </div>
  )
}

export default Dashboard