import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailPost() {
  let { id } = useParams(); // mendeteksi id dari salah satu post yang dipilih
  const [postDetail, setPostDetail] = useState({}); // nilai awal object kosong
  const [comments, setComments] = useState([]); // diawal nilai comments masih kosong
  const [newComment, setNewComment] = useState(""); // diawal newComment masih kosong

  useEffect(() => {
    // mendapatkan 1 detail post
    axios.get(`http://localhost:8001/posts/byId/${id}`).then((response) => {
      setPostDetail(response.data); // postDetail diisi dengan response.data
    });
    // mendapatkan comments untuk per 1 detail post
    axios.get(`http://localhost:8001/comments/${id}`).then((response) => {
      setComments(response.data); // comments diisi dengan response.data
    });
  }, []); // di render sekali ketika halaman detail post dibuka

  const addComment = () => {
    axios
      .post(
        "http://localhost:8001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          // console.log(response.data.error);
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment(""); // reset input
        }
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postDetail.title}</div>
          <div className="body">{postDetail.postText}</div>
          <div className="footer">{postDetail.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Enter your comment here"
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments &&
            comments.map((comment, value) => {
              return (
                <div className="comment" key={value}>
                  <p>
                    Comment: <strong>{comment.commentBody}</strong>
                  </p>
                  <p>
                    Username: <strong>{comment.username}</strong>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default DetailPost;
