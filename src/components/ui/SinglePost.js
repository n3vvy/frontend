import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userRequest } from "../../services/requestMethods";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";

const CustomFormLabel = styled("label")`
  color: #8d66ad;
  font-size: 20px;
  font-weight: bold;
  text-shadow: 1px 1px 10px #8d66ad;
`;

const CustomDialogTitle = styled(DialogTitle)`
  color: #8d66ad;
  font-weight: bold;
  text-shadow: 1px 1px 10px #8d66ad;
`;


const CustomDialogPaper = styled(Paper)`
  background: #1b0749;
  border: 2px solid #8d66ad;
  border-radius: 12px;
`;

const CustomTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    color: #8d66ad;
  }

  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #8d66ad;
  }

  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #8d66ad;
  }
`;

const SinglePost = (props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);
  const [editMessage, setEditMessage] = useState("");
  const [isFormChanged, setIsFormChanged] = useState(false);
  const loggedUser = useSelector((state) => state.user);
  console.log(loggedUser.currentUser._id)
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
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

  const handleEdit = () => {
    const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
    const postCreatedAt = new Date(props.date);

    if (postCreatedAt.getTime() < twoHoursAgo) {
      alert("Tego postu nie można już edytować, ponieważ minęły już dwie godziny od czasu dodania postu.");
    } else {
      setIsDialogOpen(true);
    }
  };

  const saveChanges = async () => {
    if (!isFormChanged) {
      setEditMessage("Nie udało się zedytować postu, ponieważ nie zostały wprowadzone żadne zmiany.");
      return;
    }

    if (editedTitle.trim() === "") {
      setEditMessage("Nie możesz zostawić pustego miejsca.");
      return;
    }

    try {
      await userRequest.put(`/post/edit/${props.id}`, {
        user_id: props.user_id,
        title: editedTitle,
        content: editedContent,
        category: props.category,
      });
      setEditMessage("Post został pomyślnie zedytowany!");
      setIsDialogOpen(false);
      window.location.reload(); // Odśwież stronę
    } catch (error) {
      console.error(error);
      setEditMessage("Niestety nie udało się zedytować postu!");
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="single-post">
      <div className="single-post-left">
        <Link to={`/post/${props.id}`}>
          <h1>Tytuł: {props.title}</h1>
          {!props.isMostLiked && <p>Data utworzenia: {formatDate(props.date)}</p>}
          {!props.onlyTitle && <p>Treść: {props.content}</p>}
        </Link>
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
            {loggedUser.currentUser._id === props.user_id &&(
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
                <Button onClick={handleEdit} disabled={isDeleting}>
                  Edytuj
                </Button>
              </>
            )}
          </>
        )}
      </p>
    </div>

      {/* Okno dialogowe edycji */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog} PaperComponent={CustomDialogPaper}>
        <CustomDialogTitle>Edycja postu</CustomDialogTitle>
        <DialogContent>
          <CustomTextField
            label={<CustomFormLabel>Tytuł</CustomFormLabel>}
            value={editedTitle}
            onChange={handleTitleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              className: "custom-form-label",
              shrink: true,
            }}
            isFocused={isDialogOpen}
          />
          {!props.onlyTitle && (
            <CustomTextField
              label={<CustomFormLabel>Treść</CustomFormLabel>}
              value={editedContent}
              onChange={handleContentChange}
              fullWidth
              multiline
              variant="outlined"
              margin="normal"
              InputLabelProps={{
                className: "custom-form-label",
                shrink: true,
              }}
              isFocused={isDialogOpen}
            />
          )}
          <p style={{ color: "#8d66ad", fontWeight: "bold", textShadow: "1px 1px 10px #8d66ad" }}>
            {editMessage}
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Anuluj</Button>
          <Button onClick={saveChanges} disabled={isDeleting}>
            Zapisz zmiany
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SinglePost;
