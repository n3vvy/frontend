import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../../services/requestMethods";
import NewestPosts from "./NewestPosts";
import { useParams } from "react-router-dom";

const UsersPost = ({ identifier, username }) => {
  const [userPosts, setUserPosts] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        let res;
        if (!isNaN(identifier)) {
          // Jeśli identifier jest liczbą, to wyszukaj posty po ID użytkownika
          res = await userRequest.get(`/post/get-user-posts/${identifier}`);
        } else {
          // W przeciwnym razie wyszukaj posty po nazwie użytkownika
          res = await userRequest.get(`/post/get-user-posts-by-username/${identifier}`);
        }
        setUserPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getUserPosts();
  }, [identifier]);

  return (
    <>
      <div>
        <h5>{`Posty użytkownika ${username}:`}</h5>
        <div>
          {userPosts ? (
            <NewestPosts info={userPosts}></NewestPosts>
          ) : (
            "Niestety nie umiem tego zrobić ;c "
          )}
        </div>
      </div>
    </>
  );
};

export default UsersPost;
