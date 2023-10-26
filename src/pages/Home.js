import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  // inisialisasi nilai awal
  const [allPosts, setAllPosts] = useState([]); // nilai awal array kosong
  // deklarasi useHistory
  let history = useHistory(); // redirect

  useEffect(() => {
    axios.get("http://localhost:8001/posts").then((response) => {
      console.log(response);
      setAllPosts(response.data); // allPosts diisi dengan response.data
    });
  }, []);
  // useEffect dependencies
  // []: useEffect dijalankan satu kali diawal
  // [parameter]: useEffect dijalankan ketika terjadi perubahan pada parameter

  return (
    <div className="App"> 
      {allPosts.map((key, value) => {
        return (
          <div className="post" onClick={() => history.push(`/post/${key.id}`)}>
            <div className="title">{key.title}</div>
            <div className="body">{key.postText}</div>
            <div className="footer">{key.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
