import { React, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import { User } from "../UserContext";

const EditArticleDiv = styled.div`
  text-align: center;

  p {
    margin-top: 15px;
    margin-bottom: 10px;
  }

  input {
    text-align: center;
  }

  textarea,
  input {
    font-size: 1.3rem;
    display: block;
    margin: 5px auto;
    min-width: 90%;
    max-width: 95%;
  }

  textarea {
    min-height: 50vh;
    resize: none;
  }

  button {
    font-size: 1.3rem;
    background-color: white;
    border: 1px solid black;
    margin: 15px auto;
    min-width: 45%;
    max-width: 48%;
    cursor: pointer;
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

export default function EditArticle() {
  let { user } = useContext(User);
  let [article, setarticle] = useState();
  let [newtitle, setnewtitle] = useState();
  let [newcontent, setnewcontent] = useState();
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    if (render === true) {
      if (!user) {
        window.location.href = "/login";
      }
    }

    let url = window.location.pathname.split("/");
    let id = { id: url[3] };
    axios
      .post(`http://localhost:${process.env.PORT}/api/articles/getarticle`, id)
      .then((res) => {
        setarticle(res.data);
      })
      .catch((err) => {
        alert("Something went wrong reloading...");
        setTimeout(() => window.location.reload(), 2000);
      });
  }, [render, user]);

  let update = () => {
    if (
      user.role == "moderator" ||
      user.role == "admin" ||
      user.id == article.authorId
    ) {
      let updatedarticle = {
        id: article._id,
        title: newtitle,
        content: newcontent,
        eddited: user.email,
      };
      axios
        .put(`http://localhost:${process.env.PORT}/api/articles/updatearticle`, updatedarticle)
        .then((res) => {
          document.querySelector("#title").innerHTML = res.data.message;
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        })
        .catch((err) => {
          document.querySelector("#title").innerHTML = err.data.message;
        });
    } else {
      document.querySelector("#title").innerHTML =
        "You aren't authorized to change this article ";
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <>
      {article && (
        <EditArticleDiv>
          <p id="title">Edit an article</p>
          <label htmlFor="">Title:</label>
          <input
            type="text"
            defaultValue={article.title}
            required
            onChange={(e) => {
              setnewtitle(e.target.value);
            }}
          />
          <label htmlFor="">Content:</label>
          <textarea
            defaultValue={article.content}
            required
            onChange={(e) => {
              setnewcontent(e.target.value);
            }}
          />
          <button
            onClick={() => {
              update();
            }}
          >
            Edit
          </button>
        </EditArticleDiv>
      )}
    </>
  );
}
