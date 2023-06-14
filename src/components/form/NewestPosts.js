import React from "react";
import SinglePost from "../ui/SinglePost";

const NewestPosts = (props) => {
  const columns = [];

  Array.from(props.info).forEach((post) => {
    if (post._id) { // Sprawdź, czy post._id istnieje
      columns.push(
        <SinglePost
          id={post._id}
          title={post.title}
          content={post.content}
          username={post.username}
          user_id={post.user_id} 
          key={post._id}
          category={post.category}
        />
      );
    }
  });
  
  return <div className="newest-posts">{columns}</div>;
};

export default NewestPosts;
