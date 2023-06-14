import { ThumbUpOffAlt, ArrowDropDown } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { convertToReadableDate } from "../../services/convertToReadableDate";
import { publicRequest, userRequest } from "../../services/requestMethods";
import AddComment from "../form/AddComment";
import { Link } from 'react-router-dom';

const AddReply = (props) => {
  const [openReplyAdd, setOpenReplyAdd] = useState(false);

  return (
    <div className="add-reply" style={{ display: 'block', alignItems: 'center' }}>
      <Button onClick={() => setOpenReplyAdd(!openReplyAdd)} size="small" sx={{ fontSize: '14px', height: '32px', color: '#8d66ad' }}>
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
              sortOption={props.sortOption}
            ></CommentsDisplay>
          )}
        </>
      )}
    </div>
  );
};

const CommentsDisplay = ({ comments, refreshComments, sortOption }) => {
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

  // Dodaj sortowanie komentarzy
  const sortedComments = comments.sort((a, b) => {
    if (sortOption === "newest") {
      return new Date(b.date) - new Date(a.date); // sortowanie po najnowszych
    } else if (sortOption === "popular") {
      return b.likes.length - a.likes.length; // sortowanie po najpopularniejszych
    }
    return 0;
  });

  return (
    <div className="comments-display">
      {sortedComments.map((comment) => (
        <div className="comment-container" key={comment?._id}>
          <div className="comment-content">
            <div className="comment-left">
              <Avatar sx={{ width: 26, height: 26, fontSize: "small", backgroundColor: "#1b0749", color: "#ffffff", border: "2px solid #8d66ad" }}>
                {user?.username.slice(0, 2).toUpperCase()}
              </Avatar>
            </div>
            <div className="comment-right">
              <div className="username-date">
              <Link to={`/users/${comment?.user_id?.username}/${comment?.user_id?._id}`}>
                <h4 className="username" style={{ color: '#8d66ad' }}>{comment?.user_id?.username}</h4>
                </Link>
                <span className="comment-date">
                  {convertToReadableDate(comment?.date)}
                </span>
              </div>
              <p className="comment-content">{comment?.content}</p>
            </div>
          </div>
          <div className="comment-footer">
            <div className="singlecomment-like">
              <Button onClick={() => addLike(comment._id, user._id)} endIcon={<ThumbUpOffAlt style={{ color: '#8d66ad' }} />}>LIKE</Button>
              <p style={{ color: '#8d66ad', marginTop:"6px" }}>{comment?.likes?.length || 0}</p>
            </div>
            <AddReply
              comment={comment}
              refreshComments={refreshComments} // przekazanie funkcji odświeżającej
            ></AddReply>
            {comment?.user_id?._id === user?._id && (
              <Button
                size="small"
                style={{ fontSize: "14px", color: '#8d66ad' }}
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
            sortOption={sortOption}
          ></ShowReplies>
        </div>
      ))}
    </div>
  );
};

const CommentsContainer = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [sortOption, setSortOption] = useState("newest"); // "newest" - najnowsze, "popular" - najpopularniejsze

  const refreshComments = async () => {
    try {
      const res = await publicRequest.get("/comment/comments/" + postId);
      let sortedComments;
      if (sortOption === "newest") {
        sortedComments = res.data.sort((a, b) => new Date(b.date) - new Date(a.date)); // sortowanie po najnowszych
      } else if (sortOption === "popular") {
        sortedComments = res.data.sort((a, b) => b.likes.length - a.likes.length); // sortowanie po najpopularniejszych
      }
      setComments(sortedComments);
    } catch (err) {
      console.log("Problem z wczytaniem komentarzy");
    }
  };

  useEffect(() => {
    refreshComments();
  }, [postId, sortOption]);

  return (
    <>
      <div className="sorted-comment">
        <Button
          onClick={() => setSortOption("newest")}
          style={{
            color: '#8d66ad',
            fontSize: '16px',
            fontWeight: 'bold',
            textShadow: '1px 1px 10px #8d66ad'
          }}
        >
          Najnowsze
        </Button>

        <Button
          onClick={() => setSortOption("popular")}
          style={{
            color: '#8d66ad',
            fontSize: '16px',
            fontWeight: 'bold',
            textShadow: '1px 1px 10px #8d66ad'
          }}
        >
          Najpopularniejsze
        </Button>

      </div>
      <CommentsDisplay
        comments={comments}
        refreshComments={refreshComments}
        sortOption={sortOption}
      />
    </>
  );
};

export default CommentsContainer;
