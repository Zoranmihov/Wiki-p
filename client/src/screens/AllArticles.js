import { React, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { User } from "../UserContext";
// Style
let StyledAbout = styled.div`
  text-align: center;
  margin-top: 8px;

  input {
    font-size: 1rem;
    padding: 3px;
    margin: 1px 0;
    outline: none;
}

input:focus {
  background-color: rgb(240, 240, 240);
}

button {
  font-size: 1rem;
  padding: 3px;
  margin-top: 15px;
  background-color: white;
  border 1px solid black;
  align-self: center;
}

button:hover {
  background-color: rgb(240, 240, 240);
}

  table,
  td,
  th {
    border: 1px solid black;
  }

  table {
    font-size: 1.1rem;
    width: 98%;
    border-collapse: collapse;
    text-align: center;
    padding: 5px;
    margin: 1%;
  }

  span {
    font-size: 1.2rem;
  }

  #ltag {
    text-decoration: underline;
    font-style: italic;
    color: black;
  }
`;

export default function AllArticles() {
  let [articles, setarticles] = useState();
  let [filter, setFilter] = useState();
  let [filterdArticles, setFilterdArticles] = useState();
  let { user } = useContext(User);
  useEffect(() => {
    axios
      .get(`http://localhost:${process.env.PORT}/api/articles/getallarticles`)
      .then((result) => {
        setFilterdArticles(result.data);
        setarticles(result.data);
      })
      .catch((err) => {
        setarticles(0);
      });
  }, []);

  let filtering = () => {
    if (!filter) {
      setFilterdArticles(articles);
    }
    let result = [];
    articles.map((article) => {
      if (
        article.author.toLowerCase().includes(filter.toLowerCase()) ||
        article.title.toLowerCase().includes(filter.toLowerCase())
      ) {
        result.push(article);
      }
    });
    setFilterdArticles(result);
  };

  return (
    <StyledAbout>
      <span>
        Want to submit your own article{" "}
        <a id="ltag" href="/articles/new">
          Click here
        </a>
      </span>
      <div>
        <input
          type="text"
          placeholder="Search by title or author"
          onChange={(e) => setFilter(e.target.value)}
        />{" "}
        <button onClick={(e) => filtering()}>Search</button>
      </div>
      {filterdArticles && (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Created on</th>
              <th>Last modified on</th>
            </tr>
          </thead>
          <tbody>
            {filterdArticles.map((article) => {
              return (
                <tr>
                  <td>
                    <a href={`/articles/${article._id}`}>{article.title}</a>
                  </td>
                  <td>{article.author}</td>
                  <td>{article.createdAt.substring(0, 10)}</td>
                  <td>{article.updatedAt.substring(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </StyledAbout>
  );
}
