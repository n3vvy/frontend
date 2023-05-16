//V3
import {
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  ArrowDropDown,
} from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { AlertContext } from "../../context/react/AlertContext";
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
        console.log("Problem z odpowiedzi do komentarza");
      }
    };
    getReplies();
  }, [props.commentId]);

  return (
    <div className="comment-replies">
      {props?.replies?.length > 0 ? (
        <>
          <Button
            size="small"
            sx={{ fontSize: "12px", height: "22px" }}
            onClick={() => {
              setShowReplies(!showReplies);
            }}
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
      ) : (
        ""
      )}
    </div>
  );
};

const CommentsDisplay = ({ comments, refreshComments }) => {
  const user = useSelector((state) => state?.user.currentUser);

  const [commentList, setCommentList] = useState(comments);

  // const deleteComment = async (commentId, userId) => {
  //   try {
  //     const response = await userRequest.delete(`/comment/${userId?._id}/${commentId}`);
  //     console.log(response.data);
  //     setCommentList(commentList.filter((comment) => comment._id !== commentId));
  //     refreshComments(); // wywołanie funkcji odświeżającej stan komponentu nadrzędnego
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const deleteComment = async (commentId, userId) => {
    const confirmed = window.confirm("Czy na pewno chcesz kontynuować?");
    if (confirmed) {
      try {
        const response = await userRequest.delete(`/comment/${userId?._id}/${commentId}`);
        console.log(response.data);
        setCommentList(commentList.filter((comment) => comment._id !== commentId));
        refreshComments(); // wywołanie funkcji odświeżającej stan komponentu nadrzędnego
        alert("Pomyślnie usunięto komentarz.");
      } catch (error) {
        console.error(error);
        alert("Wystąpił błąd podczas usuwania komentarza. Spróbuj ponownie później.");
      }
    } else {
      alert("Anulowano usuwanie komentarza.");
    }
  };

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  return (
    <div className="comments-display">
      {Array.from(comments).map((comment) => (
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
            <IconButton
              size="small"
              sx={{ fontSize: "12px", height: "32px", width: "32px" }}
            >
              <ThumbUpOffAlt sx={{ height: "18px" }}></ThumbUpOffAlt>
            </IconButton>
<<<<<<< HEAD
            <AddReply
              comment={comment}
              refreshComments={refreshComments} // przekazanie funkcji odświeżającej
            ></AddReply>
            {comment?.user_id?._id === user?._id ? (
              <Button
                size="small"
                onClick={() => deleteComment(comment?._id, comment?.user_id)}
              >
                USUŃ
              </Button>
            ) : null}
=======
            {/* <IconButton
              size="small"
              sx={{ fontSize: "12px", height: "32px", width: "32px" }}
            >
              <ThumbDownOffAlt sx={{ height: "18px" }}></ThumbDownOffAlt>
            </IconButton> */}
            {/* <Button onClick={() => setXs(!xs)} size="small" sx={{ fontSize: "12px", height: "32px" }}>
              Odpowiedz
            </Button>
            {xs &&<AddComment type="addReply" commentId={comment?._id}></AddComment>} */}
            <AddReply comment={comment}></AddReply>
>>>>>>> 24f72e3 (fix)
          </div>
          <ShowReplies
            replies={comment?.replies}
            commentId={comment?._id}
            refreshComments={refreshComments} // przekazanie funkcji odświeżającej
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
      setComments(res.data);
    } catch (err) {
      console.log("Problem z wczytaniem komentarzy");
    }
  }

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

// //V2
// import {
//   ThumbUpOffAlt,
//   ThumbDownOffAlt,
//   ArrowDropDown,
// } from "@mui/icons-material";
// import { Avatar, Button, IconButton } from "@mui/material";
// import React, { useState, useEffect, useContext } from "react";
// import { useSelector } from "react-redux";
// import { AlertContext } from "../../context/react/AlertContext";
// import { convertToReadableDate } from "../../services/convertToReadableDate";
// import { publicRequest, userRequest } from "../../services/requestMethods";
// import AddComment from "../form/AddComment";

// const AddReply = (props) => {
//   const [openReplyAdd, setOpenReplyAdd] = useState(false);
//   return (
//     <div className="add-reply">
//       <Button
//         onClick={() => setOpenReplyAdd(!openReplyAdd)}
//         size="small"
//         sx={{ fontSize: "12px", height: "32px" }}
//       >
//         Odpowiedz
//       </Button>

//       {openReplyAdd && (
//         <AddComment
//           type="addReply"
//           commentId={props.comment?._id}
//           refreshComments={props.refreshComments}
//         ></AddComment>
//       )}
//     </div>
//   );
// };

// const ShowReplies = (props) => {
//   const [replies, setReplies] = useState("");
//   const [showReplies, setShowReplies] = useState(false);

//   useEffect(() => {
//     const getReplies = async () => {
//       try {
//         const res = await publicRequest.get(
//           "/comment/replies/" + props?.commentId
//         );
//         setReplies(res.data);
//       } catch (err) {
//         console.log("Problem z odpowiedzi do komentarza");
//       }
//     };
//     getReplies();
//   }, [setReplies]);

//   return (
//     <div className="comment-replies">
//       {props?.replies?.length > 0 ? (
//         <>
//           <Button
//             size="small"
//             sx={{ fontSize: "12px", height: "22px" }}
//             onClick={() => {
//               setShowReplies(!showReplies);
//             }}
//           >
//             <ArrowDropDown></ArrowDropDown>
//             {props?.replies?.length} odpowiedzi
//           </Button>
//           {showReplies && (
//             <CommentsDisplay
//               comments={replies}
//               refreshComments={props.refreshComments}
//             ></CommentsDisplay>
//           )}
//         </>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// const CommentsDisplay = ({ comments, refreshComments }) => {
//   const user = useSelector((state) => state?.user.currentUser);

//   const [commentList, setCommentList] = useState(comments);

//   const deleteComment = async (commentId, userId) => {
//     try {
//       const response = await userRequest.delete(
//         `/comment/${userId?._id}/${commentId}`
//       );
//       console.log(response.data);
//       setCommentList(
//         commentList.filter((comment) => comment._id !== commentId)
//       );
//       refreshComments(); // wywołanie funkcji odświeżającej stan komponentu nadrzędnego
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     setCommentList(comments);
//   }, [comments]);

//   return (
//     <div className="comments-display">
//       {Array.from(comments).map((comment) => (
//         <div className="comment-container" key={comment?._id}>
//           <div className="comment-content">
//             <div className="comment-left">
//               <Avatar sx={{ width: 26, height: 26, fontSize: "small" }}>
//                 {comment?.user_id?.username.slice(0, 2).toUpperCase()}
//               </Avatar>
//             </div>
//             <div className="comment-right">
//               <div className="username-date">
//                 <h4 className="username">{comment?.user_id?.username}</h4>
//                 <span className="comment-date">
//                   {convertToReadableDate(comment?.date)}
//                 </span>
//               </div>
//               <p class="comment-content">{comment?.content}</p>
//             </div>
//           </div>
//           <div class="comment-footer">
//             <IconButton
//               size="small"
//               sx={{ fontSize: "12px", height: "32px", width: "32px" }}
//             >
//               <ThumbUpOffAlt sx={{ height: "18px" }}></ThumbUpOffAlt>
//             </IconButton>
//             <AddReply
//               comment={comment}
//               refreshComments={refreshComments} // przekazanie funkcji odświeżającej
//             ></AddReply>
//             {comment?.user_id?._id === user._id ? (
//               <Button
//                 size="small"
//                 onClick={() => deleteComment(comment?._id, comment?.user_id)}
//               >
//                 USUŃ
//               </Button>
//             ) : null}
//           </div>
//           <ShowReplies
//             replies={comment?.replies}
//             commentId={comment?._id}
//             refreshComments={refreshComments}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// const CommentsContainer = ({ postId }) => {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const getComments = async () => {
//       try {
//         const res = await publicRequest.get("/comment/comments/" + postId);
//         setComments(res.data);
//       } catch (err) {
//         console.log("Problem z wczytaniem komentarzy");
//       }
//     };
//     getComments();
//   }, [postId]);

//   return (
//     <CommentsDisplay
//       comments={comments}
//       refreshComments={() => {
//         setComments([]); // wyczyszczenie stanu
//         const getComments = async () => {
//           try {
//             const res = await publicRequest.get("/comment/comments/" + postId);
//             setComments(res.data);
//           } catch (err) {
//             console.log("Problem z wczytaniem komentarzy");
//           }
//         };
//         getComments();
//       }}
//     />
//   );
// };
// export default CommentsContainer;


//V1
// import {
//   ThumbUpOffAlt,
//   ThumbDownOffAlt,
//   ArrowDropDown,
// } from "@mui/icons-material";
// import { Avatar, Button, IconButton } from "@mui/material";
// import React, { useState, useEffect, useContext } from "react";
// import { useSelector } from "react-redux";
// import { AlertContext } from "../../context/react/AlertContext";
// import { convertToReadableDate } from "../../services/convertToReadableDate";
// import { publicRequest, userRequest } from "../../services/requestMethods";
// import AddComment from "../form/AddComment";

// const AddReply = (props) => {
//   const [openReplyAdd, setOpenReplyAdd] = useState(false);
//   return (
//     <div className="add-reply">
//       <Button
//         onClick={() => setOpenReplyAdd(!openReplyAdd)}
//         size="small"
//         sx={{ fontSize: "12px", height: "32px" }}
//       >
//         Odpowiedz
//       </Button>

//       {openReplyAdd && <AddComment type="addReply" commentId={props.comment?._id}></AddComment>}
//     </div>
//   );
// };

// const ShowReplies = (props) => {
//   const [replies, setReplies] = useState("");
//   const [showReplies, setShowReplies] = useState(false);
//   //   function handleClick() {}

//   console.log(replies);

//   useEffect(() => {
//     const getReplies = async () => {
//       try {
//         const res = await publicRequest.get(
//           "/comment/replies/" + props?.commentId
//         );
//         setReplies(res.data);
//       } catch (err) {
//         console.log("Problem z odpowiedzi do komentarza");
//       }
//     };
//     getReplies();
//   }, [setReplies]);

//   return (
//     <div className="comment-replies">
//       {props?.replies?.length > 0 ? (
//         <>
//           <Button
//             size="small"
//             sx={{ fontSize: "12px", height: "22px" }}
//             onClick={() => {
//               setShowReplies(!showReplies);
//             }}
//             // onClick={() => handleClick()}
//           >
//             <ArrowDropDown></ArrowDropDown>
//             {props?.replies?.length} odpowiedzi
//           </Button>
//           {showReplies && (
//             <CommentsDisplay comments={replies}></CommentsDisplay>
//           )}
//         </>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// const CommentsDisplay = ({ comments, refreshComments }) => {
//   // const { inputProps } = useContext(AlertContext);
//   const user = useSelector((state) => state?.user.currentUser);

//   const [commentList, setCommentList] = useState(comments);

//   const deleteComment = async (commentId, userId) => {
//     console.log(userId?._id)

//     try {
//       const response = await userRequest.delete(`/comment/${userId?._id}/${commentId}`);
//       console.log(response.data); // Tutaj możesz zaktualizować stan komponentu nadrzędnego lub odświeżyć stronę
//       setCommentList(commentList.filter((comment) => comment._id !== commentId));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     setCommentList(comments);
//   }, [comments]);

//   console.log(comments);
//   return (
//     <div className="comments-display">
//       {Array.from(comments).map((comment) => (
//         <div className="comment-container" key={comment?._id}>
//           <div className="comment-content">
//             <div className="comment-left">
//               <Avatar sx={{ width: 26, height: 26, fontSize: "small" }}>
//                 {comment?.user_id?.username.slice(0, 2).toUpperCase()}
//               </Avatar>
//             </div>
//             <div className="comment-right">
//               <div className="username-date">
//                 <h4 className="username">{comment?.user_id?.username}</h4>
//                 <span className="comment-date">
//                   {convertToReadableDate(comment?.date)}
//                 </span>
//               </div>
//               <p class="comment-content">{comment?.content}</p>
//             </div>
//           </div>
//           <div class="comment-footer">
//             <IconButton
//               size="small"
//               sx={{ fontSize: "12px", height: "32px", width: "32px" }}
//             >
//               <ThumbUpOffAlt sx={{ height: "18px" }}></ThumbUpOffAlt>
//             </IconButton>
//             <AddReply comment={comment} refreshComments={refreshComments}></AddReply>
//             {comment?.user_id?._id === user._id ?
//             <Button size="small" onClick={() => deleteComment(comment?._id,comment?.user_id)}>USUŃ</Button>
//           : null
//           }
//           </div>
//           <ShowReplies
//             replies={comment?.replies}
//             commentId={comment?._id}
//           ></ShowReplies>
//         </div>
//       ))}
//     </div>
//   );
// };

// const CommentsContainer = ({ postId }) => {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const getComments = async () => {
//       try {
//         const res = await publicRequest.get("/comment/comments/" + postId);
//         setComments(res.data);
//       } catch (err) {
//         console.log("Problem z wczytaniem komentarzy");
//       }
//     };
//     getComments();
//   }, [postId]);

//   return <CommentsDisplay comments={comments} />;
// };

// export default CommentsContainer;
