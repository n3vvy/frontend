import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../../services/requestMethods";

const SinglePost = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [editMessage, setEditMessage] = useState("");

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
    if (editedTitle === props.title && editedContent === props.content) {
      setEditMessage("Nie została zmieniona żadna treść.");
      return;
    }

    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
    const postCreatedAt = new Date(props.createdAt);

    if (postCreatedAt < twoHoursAgo) {
      setEditMessage("Minęły dwie godziny, nie można już edytować postu.");
      return;
    }

    try {
      await userRequest.put(`/post/edit/${props.id}`, {
        user_id: props.user_id,
        title: editedTitle,
        content: editedContent,
        category: props.category
      });
      setIsEditing(false);
      setEditMessage("Edytowałeś post prawidłowo!");
    } catch (error) {
      console.error(error);
      setEditMessage("Niestety nie udało się edytować postu!");
    }
  }

  return (
    <div className="single-post">
      <div className="single-post-left">
        {isEditing ? (
          <>
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#8d66ad", fontWeight: "bold", textShadow: "1px 1px 10px #8d66ad" }}>
                  Tytuł:
                </p>
                <input
                  style={{
                    width: "100%",
                    backgroundColor: "#8d66ad",
                    color: "#000000",
                    fontSize: "16px",
                  }}
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                <p style={{ color: "#8d66ad", fontWeight: "bold", textShadow: "1px 1px 10px #8d66ad" }}>
                  Treść:
                </p>
                <textarea
                  style={{
                    width: "100%",
                    color: "#000000",
                    fontSize: "16px",
                  }}
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleEdit} disabled={isDeleting}>
              Zapisz zmiany
            </Button>
            <p>{editMessage}</p>
          </>
        ) : (
          <>
            <Link to={`/post/${props.id}`}>
              <h1>{props.title}</h1>
            </Link>
            <p>{props.content}</p>
          </>
        )}
      </div>
      <div className="single-post-right">
        <p>
          {props.username ? (
            <>
              Nadesłane przez:{" "}
              <Link to={`/users/${props.username}/${props.user_id}`}>
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
