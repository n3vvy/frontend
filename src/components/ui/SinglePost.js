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
  const [isFormChanged, setIsFormChanged] = useState(false);

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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    const formattedDate = `${hours}:${minutes}  ${day}-${month}-${year}`;
    return formattedDate;
  }

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
    setIsFormChanged(true);
  };

  const handleContentChange = (e) => {
    setEditedContent(e.target.value);
    setIsFormChanged(true);
  };

  function handleEdit() {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    const postCreatedAt = new Date(props.date);

    if (postCreatedAt.getTime() < twoHoursAgo) {
      alert("Tego postu nie można już edytować, ponieważ minęły już dwie godziny od czasu dodania postu.");
    } else {
      setIsEditing(true);
      setEditMessage("");
      setIsFormChanged(false);
    }
  }

  async function saveChanges() {
    if (!isFormChanged) {
      setEditMessage("Nie udało się zedytować postu, ponieważ nie zostały wprowadzone żadne zmiany.");
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
      setEditMessage("Post został pomyślnie zedytowany!");
      window.location.reload(); // Odśwież stronę
    } catch (error) {
      console.error(error);
      setEditMessage("Niestety nie udało się zedytować postu!");
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
                  onChange={handleTitleChange}
                />
              </div>
              {props.onlyTitle ? null : (
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
                    onChange={handleContentChange}
                  />
                </div>
              )}
            </div>
            <Button onClick={saveChanges} disabled={isDeleting}>
              Zapisz zmiany
            </Button>
            <p>{editMessage}</p>
          </>
        ) : (
          <>
            <Link to={`/post/${props.id}`}>
              <h1>Tytuł: {props.title}</h1>
              {props.onlyTitle ? null : <p>Data utworzenia: {formatDate(props.date)}</p>}
            </Link>
            {props.onlyTitle ? null : <p>Treść: {props.content}</p>}
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
              <Button onClick={handleEdit} disabled={isEditing || isDeleting}>
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
