import { React, useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { User } from "../UserContext";

const NewArticleDiv = styled.div`
  text-align: center;

  p {
    margin-top: 15px;
    margin-bottom: 5px;
  }

  input {
    text-align: center;
  }

  textarea,
  input {
    font-size: 1.3rem;
    display: block;
    margin: 5px auto;
    min-width: 50%;
    max-width: 80%;
  }

  textarea {
    min-height: 30vh;
    resize: none;
  }

  button {
    font-size: 1.3rem;
    background-color: white;
    border: 1px solid black;
    margin: 15px auto;
    min-width: 50%;
    cursor: pointer;
    max-width: 80%;
  }

  @media screen and (min-width: 1200px) {
    p {
      font-size: 1.8rem;
    }

    label {
      font-size: 1.4rem;
    }
  }
`;

export default function NewArticle() {
  let [title, settitle] = useState("");
  let [content, setcontent] = useState("");
  let [render, setRender] = useState(false)
  let { user } = useContext(User);

  useEffect(() => {
    setRender(true)
  }, []);

  useEffect(() => {
    if(render === true) {
       if(!user){
       window.location.href= '/login'
       }
    }
  }, [render, user]);

  const create = () => {
    if (!user) {
      document.querySelector("#title").innerHTML =
        "You must be logged in to create a new article";
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } else {
      let newArticle = {
        title,
        content,
        author: user.name,
        authorId: user.id
      };
      axios
        .post(`/api/articles/new`, newArticle)
        .then((res) => {
          document.querySelector("#title").innerHTML = res.data.message;
          setTimeout(() => {
            window.location.href = "/articles";
          }, 2000);
        })
        .catch((err) => {
          document.querySelector("#title").innerHTML = err.data.message;
        });
    }
  };
  return (
    <NewArticleDiv>
      <p id="title">Create a new article</p>
      <label htmlFor="">Title</label>
      <input
        type="text"
        onChange={(e) => {
          settitle(e.target.value);
        }}
        required
      />
      <label htmlFor="">Content</label>
      <textarea
        required
        onChange={(e) => {
          setcontent(e.target.value);
        }}
      ></textarea>
      <button onClick={() => create()}>Create</button>
    </NewArticleDiv>
  );
}
