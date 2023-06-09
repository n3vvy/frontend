import React from "react";
import SinglePost from "../ui/SinglePost";

const MostLikedPosts = (props) => {
  let sortedPosts = [];

  if (Array.isArray(props.info)) {
    sortedPosts = [...props.info].sort((a, b) => b.likeValue - a.likeValue);
    console.log(props.info);
  }

  const columns = [];

  sortedPosts.slice(0, 10).forEach((post) => {
    columns.push(
      <SinglePost
        id={post._id}
        title={post.title}
        username={post.username}
        user_id={post.user_id}
        key={post._id}
        onlyTitle={true}
        isMostLiked={true} // Dodaj to
      ></SinglePost>
    );
  });

  return <div className="most-liked-posts">{columns}</div>;
};

export default MostLikedPosts;
