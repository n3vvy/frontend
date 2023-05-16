// ...
import { ThumbUpOffAlt, ThumbDownOffAlt, ArrowDropDown } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convertToReadableDate } from "../../services/convertToReadableDate";
import { publicRequest, userRequest } from "../../services/requestMethods";
import AddComment from "../form/AddComment";

const AddReply = (props) => {
  const [openReplyAdd, setOpenReplyAdd] = useState(false);
  return (
    <div className="add-reply">
      <Button
        onClick={() => setOpenReplyAdd(!openReplyAdd)}
        size="small"
        sx={{ fontSize: "12px", height: "32px" }}
      >
        Odpowiedz
      </Button>

      {openReplyAdd && (
        <AddComment
          type="addReply"
          commentId={props.comment?._id}
          refreshComments={props.refreshComments}
          setOpenReplyAdd={setOpenReplyAdd}
        ></AddComment>
      )}
    </div>
  );
};

const ShowReplies = (props) => {
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    const getReplies = async () => {
      try {
        const res = await publicRequest.get(
          "/comment/replies/" + props?.commentId
        );
        setReplies(res.data);
      } catch (err) {
        console.log("Problem z odpowiedzią do komentarza");
      }
    };
    getReplies();
  }, [props.commentId]);

  return (
    <div className="comment-replies">
      {props?.replies?.length > 0 && (
        <>
          <Button
            size="small"
            sx={{ fontSize: "12px", height: "22px" }}
            onClick={() => setShowReplies(!showReplies)}
          >
            <ArrowDropDown></ArrowDropDown>
            {props?.replies?.length} odpowiedzi
          </Button>
          {showReplies && (
            <CommentsDisplay
              comments={replies}
              refreshComments={props.refreshComments}
            ></CommentsDisplay>
          )}
        </>
      )}
    </div>
  );
};

const CommentsDisplay = ({ comments, refreshComments }) => {
  const user = useSelector((state) => state.user.currentUser);

  const addLike = async (commentId, userId) => {
    try {
      const response = await userRequest.post(`/comment/toggleLikeComment`, { user_id: userId, comment_id: commentId });
      console.log(response.data);
      refreshComments(); // Odświeżenie komentarzy po dodaniu polubienia
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (commentId, userId) => {
    const confirmed = window.confirm("Czy na pewno chcesz kontynuować?");
    if (confirmed) {
      try {
        const response = await userRequest.delete(`/comment/${userId?._id}/${commentId}`);
        console.log(response.data);
        refreshComments(); // Odświeżenie komentarzy po usunięciu komentarza
        alert("Pomyślnie usunięto komentarz.");
      } catch (error) {
        console.error(error);
        alert("Wystąpił błąd podczas usuwania komentarza. Spróbuj ponownie później.");
      }
    } else {
      alert("Anulowano usuwanie komentarza.");
    }
  };

  return (
    <div className="comments-display">
      {comments.map((comment) => (
        <div className="comment-container" key={comment?._id}>
          <div className="comment-content">
            <div className="comment-left">
              <Avatar sx={{ width: 26, height: 26, fontSize: "small" }}>
                {comment?.user_id?.username.slice(0, 2).toUpperCase()}
              </Avatar>
            </div>
            <div className="comment-right">
              <div className="username-date">
                <h4 className="username">{comment?.user_id?.username}</h4>
                <span className="comment-date">
                  {convertToReadableDate(comment?.date)}
                </span>
              </div>
              <p className="comment-content">{comment?.content}</p>
            </div>
          </div>
          <div className="comment-footer">
            <div>
              <Button onClick={() => addLike(comment._id, user._id)} endIcon={<ThumbUpOffAlt />}>
                LIKE
              </Button>
              <p>{comment?.likes?.length || 0}</p>
            </div>
            <AddReply
              comment={comment}
              refreshComments={refreshComments} // przekazanie funkcji odświeżającej
            ></AddReply>
            {comment?.user_id?._id === user?._id && (
              <Button
                size="small"
                onClick={() => deleteComment(comment?._id, comment?.user_id)}
              >
                USUŃ
              </Button>
            )}
          </div>
          <ShowReplies
            replies={comment?.replies}
            commentId={comment?._id}
            refreshComments={refreshComments} 
          ></ShowReplies>
        </div>
      ))}
    </div>
  );
};

const CommentsContainer = ({ postId }) => {
  const [comments, setComments] = useState([]);

  const refreshComments = async () => {
    try {
      const res = await publicRequest.get("/comment/comments/" + postId);
      const sortedComments = res.data.sort((a, b) => b.likes.length - a.likes.length); // sortowanie komentarzy
      setComments(sortedComments);
    } catch (err) {
      console.log("Problem z wczytaniem komentarzy");
    }
  };

  useEffect(() => {
    refreshComments();
  }, [postId]);

  return (
    <CommentsDisplay
      comments={comments}
      refreshComments={refreshComments}
    />
  );
};

export default CommentsContainer;
