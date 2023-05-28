import { Close, ErrorOutline, Send } from "@mui/icons-material";
import { Avatar, Button, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import React, { useContext, useState } from "react";
import { userRequest } from "../../services/requestMethods";
import { AlertContext } from "../../context/react/AlertContext";

const AddComment = (props) => {
  const user = useSelector((state) => state?.user.currentUser);
  const [isTextFieldActive, setIsTextFieldActive] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");
  const { inputProps, open } = useContext(AlertContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    userRequest
      .post(`/comment/${props.type}`, {
        user_id: user._id,
        post_id: props.postId,
        content: commentText,
        comment_id: props?.commentId,
      })
      .then((response) => {
        console.log("Komentarz dodany pomyślnie!", response);
        inputProps.severity.value = "success";
        inputProps.alertText.value = "Pomyślnie dodano komentarz!";
        props.onCommentAdded(); // Wywołanie funkcji przekazanej jako prop w celu odświeżenia listy komentarzy
      })
      .catch((error) => {
        console.error("Błąd podczas dodawania komentarza:", error);
        setError(error.response.data.message);
      });
  };

  return (
    <div className="post-add-comment">
      <Avatar
        id="comment-avatar"
        sx={{
          width: 26,
          height: 26,
          fontSize: "small",
          backgroundColor: "#1b0749",
          color: "#ffffff",
          border: "2px solid #8d66ad",
        }}
      >
        {user?.username?.slice(0, 2).toUpperCase()}
      </Avatar>

      <Grid container>
        <Grid item xs={12} sm={10} md={10} lg={11}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 0 },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              id="standard-basic"
              label="Dodaj odpowiedź"
              multiline
              variant="standard"
              size="small"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onClick={() => setIsTextFieldActive(true)}
              onBlur={() => setIsTextFieldActive(true)}
            />
            {isTextFieldActive && (
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  size="small"
                  style={{
                    float: "left",
                    marginTop: "10px",
                    color: "#8d66ad",
                  }}
                  endIcon={<Close />}
                  onClick={() => setIsTextFieldActive(false)}
                >
                  Anuluj
                </Button>

                {error !== "" ? (
                  <div className="comment-error">
                    <ErrorOutline color="error" />
                    <p>{error}</p>
                  </div>
                ) : null}
                <Button
                  variant="contained"
                  size="small"
                  style={{
                    float: "right",
                    marginTop: "10px",
                    background: "#8d66ad",
                    color: "#1b0749",
                  }}
                  endIcon={<Send />}
                  onClick={(e) => handleSubmit(e)}
                >
                  Wyślij
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddComment;
