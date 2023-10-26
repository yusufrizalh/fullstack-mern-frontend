import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreatePost() {
  const initValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title cannot be empty!"),
    postText: Yup.string().required("Post text cannot be empty!"),
    username: Yup.string().min(8).max(16).required("Username cannot be empty!"),
  });

  const onSubmitForm = (data) => {
    axios.post("http://localhost:8001/posts", data).then((response) => {
      console.log("Data is submitted!");
    });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initValues}
        onSubmit={onSubmitForm}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title</label>
          <Field
            id="inputCreatePost"
            name="title"
            placeholder="Please enter title here"
            autoComplete="off"
          />
          <ErrorMessage name="title" component="span" />
          <label>Post</label>
          <Field
            id="inputCreatePost"
            name="postText"
            placeholder="Please enter post text here"
            autoComplete="off"
          />
          <ErrorMessage name="postText" component="span" />
          <label>Username</label>
          <Field
            id="inputCreatePost"
            name="username"
            placeholder="Please enter username here"
            autoComplete="off"
          />
          <ErrorMessage name="username" component="span" />

          <button type="submit">Create Post</button>
          <button type="reset">Crear Text</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
