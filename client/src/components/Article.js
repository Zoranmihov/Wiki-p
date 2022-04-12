import { React, useEffect, useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { User } from "../UserContext";

let StyledArticle = styled.div`
  h2 {
    font-size: 1.8rem;
    text-align: center;
    font-weight: 500;
  }

  #author {
    text-align: center !important;
    font-size: 1.5rem;
    margin-left: 8%;
    margin-top: 1%;
  }

  #content {
    font-size: 1.4rem;
    text-align: justify;
    padding: 10px;
    margin-top: 3%;
  }

  #container {
    background-color: white;
    max-width: 90%;
    min-height: 30%;
    text-align: center;
    box-shadow: 1px 3px 10px rgb(0 0 0 / 0.4);
    margin: auto;
    border-radius: 5px 5px;
  }

  #date {
    font-size: 1.5rem;
    float: right;
    margin-top: 2%;
    margin-right: 10px;
  }

  .link-container {
    text-align: center;
    margin: 7px;
  }

  .change-btn {
    margin: 5px;
    font-size: 1.2rem;
    color: black;
  }

  @media screen and (max-width: 400px) {
    h2 {
      font-size: 22px;
    }

    #content {
      font-size: 16px;
    }

    #author {
      font-size: 18px;
    }

    #date {
      font-size: 18px;
    }
  }
`;

export default function Article() {
  let [article, setarticle] = useState();
  let { user } = useContext(User);
  let url = window.location.pathname.split("/");
  let id = { id: url[2] };
  useEffect(() => {
    axios
      .post(`/api/articles/getarticle`, id)
      .then((res) => {
        setarticle(res.data);
      })
      .catch((err) => {
        document.querySelector("#title").innerHTML = "Something went wrong reloading..."
        setTimeout(() => window.location.reload(), 2000)
      });
  }, []);

  let deleteArticle = () => {
    if (user.role == "admin" || user.id == article.authorId) {
      axios
        .put(`/api/articles/deletearticle`, id)
        .then((res) => {
          document.querySelector("#title").innerHTML = res.data.message;
          setTimeout(() => {
            window.location.href = "/articles";
          }, 2000);
        })
        .catch((err) => {
          document.querySelector("#title").innerHTML = err.data.message;
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
    } else {
      document.querySelector("#title").innerHTML =
        "You aren't authorized to change delete article ";
      setTimeout(() =>window.location.reload(), 2000);
    }
  };

  return (
    <>
      {article ? (
        <StyledArticle>
          <div className="link-container">
            {user &&
              (user.role == "moderator" ||
              user.role == "admin" ||
              article.authorId == user.id ? (
                <a className="change-btn" href={`edit/${article._id}`}>
                  Edit article
                </a>
              ) : (
                <></>
              ))}
            {user &&
              (user.role == "admin" || article.authorId == user.id ? (
                <a
                  className="change-btn"
                  href="#"
                  onClick={() => {
                    deleteArticle();
                  }}
                >
                  Delete article
                </a>
              ) : (
                <></>
              ))}
          </div>
          <h2 id="title">{article.title}</h2>
          <p id="author">By: {article.author}</p>
          <div id="container">
            <p id="content">{article.content}</p>
          </div>
          <p id="date">Created on: {article.createdAt.substring(0, 10)}</p>
        </StyledArticle>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
