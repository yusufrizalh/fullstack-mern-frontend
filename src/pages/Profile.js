import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [allPostsByUserId, setAllPostsByUserId] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:8001/posts/byuserId/${id}`).then((response) => {
      setAllPostsByUserId(response.data);
    });
  }, []);

  return (
    <div className="profilePageContainer">
      <div className="basicinfo">
        <h1>Username: {username}</h1>
      </div>
      <div className="listOfPosts">
        {allPostsByUserId &&
          allPostsByUserId.map((key, value) => {
            return (
              <div key={value} className="post">
                <div className="title">{key.title}</div>
                <div className="body">{key.postText}</div>
                <div className="footer">
                  <div className="username">{key.username}</div>
                  <div className="buttons">
                    <label>{key.Likes.length}</label>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Profile;
