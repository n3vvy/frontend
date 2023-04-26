import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../services/requestMethods";
import NewestPosts from "./NewestPosts";

const MyPost = () => {
  const [myPosts, setMyPosts] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getMyPosts = async () => {
        console.log(myPosts);
      try {
        const res = await userRequest.get(
          `/post/get-my-posts/${currentUser._id}`
        );
        setMyPosts(res.data);
      } catch (err) {}
    };
    getMyPosts();
  },[myPosts]);

  return (
    <>
      <div>
        <h5>Moje posty:</h5>
        <div>
          {myPosts ? <NewestPosts info={myPosts}></NewestPosts> : "Brak"}
        </div>
      </div>
    </>
  );
};

export default MyPost;
