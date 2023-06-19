import { Send, ThumbUpAltOutlined } from "@mui/icons-material";
import { Avatar, Button, Grid, TextField, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Navbar from "../components/form/Navbar";
import { Link } from 'react-router-dom';
import LongMenuButton from "../components/ui/LongMenuButton";
import { sliderItems } from "../data/categoryGames";
import { publicRequest, userRequest } from "../services/requestMethods";
import AddComment from "../components/form/AddComment";
import CommentsContainer from "../components/form/CommentsContainer";
import { convertToReadableDate } from "../services/convertToReadableDate";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Stack } from "@mui/system";
import AlertProvider from "../context/react/AlertContext";
import { AlertContext } from "../context/react/AlertContext";
import Alerts from "../components/ui/Alerts";
import ShareDialog from "../components/form/ShareDialog";



const Post = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [post, setPost] = useState("");

  const user = useSelector((state) => state?.user.currentUser);
  const [isTextFieldActive, setIsTextFieldActive] = useState(false);

  //funkcja do wyciągnięcia w osobny plik
  function findTitleByDesc(arr, desc) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].desc !== "") {
        if (arr[i].desc === desc) {
          return arr[i].title;
        }
      }
    }
    return null;
  }

  const addLike = async (postId, userId) => {
    try {
      const response = await userRequest.post(`/post/posts/${postId}/like`, { userId: userId });
      console.log(response.data);
      setPost((prevPost) => {
        return { ...prevPost, likeValue: response.data.post.likeValue };
      });
    } catch (error) {
      console.error(error);
      // alert("Wystąpił błąd podczas aktualizacji polubień posta. Spróbuj ponownie później.");
    }
  };

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await publicRequest.get("/post/find/" + id);
        setPost(res.data.post);
        console.log(res.data);
      } catch {
        console.log("error");
      }
    };
    getPost();
  }, [id]);

  return (
    <div className="home-container">
      <Helmet>
        <title>{post?.title}</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="home-main-post">
        <div className="home-main-left">
          <div className="post-header">
            <h2>{post?.title}</h2>
            <div className="post-owner">
              <Avatar sx={{ width: 26, height: 26, fontSize: "small", backgroundColor: "#1b0749", color: "#ffffff", border: "2px solid #8d66ad" }}>
                {post?.username?.slice(0, 2).toUpperCase()}
              </Avatar>
              <Link to={`/users/${post?.username}/${post.user_id}`}>{post?.username}</Link>
            </div>
            {console.log(post)}
            <div className="post-header-desc">
              <div className="desc-left">
                <p>
                  <b>Kategoria:</b>{" "}
                  {post?.category
                    ? findTitleByDesc(sliderItems, post?.category)
                    : "Brak kategorii"}
                </p>
                <p>
                  <b>Data przesłania:</b> {convertToReadableDate(post?.date)}
                </p>
              </div>
              <div className="desc-right">
                <LongMenuButton postId = {post?._id}></LongMenuButton>
              </div>
            </div>
          </div>
          <div className="post-main">
            <p>{post?.content}</p>
          </div>
          <div className="singlepost-like">
            <Button onClick={() => addLike(post._id, user._id)} style={{ color: '#8d66ad' }} endIcon={<ThumbUpAltOutlined style={{ color: '#8d66ad' }} />}>LIKE</Button>
            <p style={{ color: '#8d66ad' }}>{post?.likeValue || 0}</p>
          </div>

          <div className="post-comments">
            <h2>Odpowiedzi:</h2>
            <AlertProvider>
              <AddComment postId={post?._id} type="addComment"></AddComment>
              <CommentsContainer postId={post?._id}></CommentsContainer>
              <Alerts></Alerts>
            </AlertProvider>
          </div>
        </div>
        <div className="stack"></div>
      </div>
    </div>
  );
};

export default Post;
