import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Typography, } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
const AllPosts = ({posts}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
    }, []);

  const [likes, setLikes] = useState({});
  const addLike = (postId) => {
    // Disable the button to prevent multiple likes
    document.getElementById('btn').disabled = true;
    axios
      .patch(`http://localhost:8000/api/likePost/${postId}`)
      .then((response) => {
        console.log(response.data);
        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: response.data.likeCount,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };console.log(JSON.stringify(posts));
  return (
    <div>

      {posts.map(post => (
        <Card sx={{ mx: 3, mb: 1 }} key={post._id}>
          <div key={post._id}>

            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">

                </Avatar>
              }
              action={
                <IconButton>
                  <MoreVertIcon />
                   </IconButton>         
              }
              title={post.creatorFirstName} 
              subheader={formatDate(post.createdAt)}
            />

            
            <CardContent>
              <Typography variant="body2" color="text.secondary"    sx={{ mx: 3, mb: 1 }} >
                {post.description}
              </Typography>
            </CardContent>

            <CardMedia
              component="img"
              height="10%"
              image={post.image}
              alt={post.creatorFirstName}
            />
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite sx={{ color: "red" }} />}
                  onClick={() => addLike(post._id)}
                  id='btn'
                />{likes[post._id] || post.likeCount}
              </IconButton>
              <IconButton aria-label="share">

              </IconButton>
            </CardActions>

          </div>
        </Card>
      ))}

    </div>
  )
}

export default AllPosts