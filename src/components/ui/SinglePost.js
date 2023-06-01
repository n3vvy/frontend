import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../../services/requestMethods";

const SinglePost = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(props.content);
  console.log(props)
  
  async function handleDelete() {
    setIsDeleting(true);
    try {
      await userRequest.delete(`/post/${props.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleEdit() {
    try {
      await userRequest.put(`/post/${props.id}`, { content: editedContent });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="single-post">
      <div className="single-post-left">
        <Link to={`/post/${props.id}`}>
          <h1>{props.title}</h1>
        </Link>
        {isEditing ? (
          <>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <Button onClick={handleEdit} disabled={isDeleting}>
              Zapisz zmiany
            </Button>
          </>
        ) : (
          <p>{props.content}</p>
        )}
      </div>
      <div className="single-post-right">
        <p>
          {props.username ? (
            <>
              Nadesłane przez:{" "}
              <Link to={`/users/${props.username}`}>
                <span style={{ color: "#8d66ad", fontSize: "16px" }}>
                  {props.username}
                </span>
              </Link>
            </>
          ) : (
            <>
              <Button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? (
                  <span style={{ color: "#8d66ad", fontSize: "16px" }}>
                    Usuwanie...
                  </span>
                ) : (
                  <span style={{ color: "#8d66ad", fontSize: "16px" }}>
                    Usuń
                  </span>
                )}
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                disabled={isEditing || isDeleting}
              >
                {isEditing ? (
                  <span style={{ color: "#8d66ad", fontSize: "16px" }}>
                    Edytowanie...
                  </span>
                ) : (
                  <span style={{ color: "#8d66ad", fontSize: "16px" }}>
                    Edytuj
                  </span>
                )}
              </Button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default SinglePost;
