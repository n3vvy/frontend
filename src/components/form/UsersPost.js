import React, { useEffect, useState } from "react";
import { userRequest } from "../../services/requestMethods";
import NewestPosts from "./NewestPosts";
import { useParams } from "react-router-dom";

const UsersPost = (props) => {
  const [userPosts, setUserPosts] = useState([]);
  // const { username, user_id } = useParams();

  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const res = await userRequest.get(`/post/get-user-posts/${props.user_id}`);
        setUserPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUserPosts();
  }, [props.user_id]);

  return (
    <div>
      <h5>{`Posty użytkownika ${props.username}:`}</h5>
      <div>
        {userPosts.length > 0 ? (
          <NewestPosts info={userPosts} />
        ) : (
          <p>Brak postów użytkownika</p>
        )}
      </div>
    </div>
  );
};

export default UsersPost;
