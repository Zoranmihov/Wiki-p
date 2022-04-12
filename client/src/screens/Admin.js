import { React, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { User } from "../UserContext";

const AdminPannel = styled.div`
  text-align: center;

.containter {
    overflow-x: auto;
}

.click-text {
    text-align: center;
    margin: 8px;
    cursor: pointer;
    font-size: 1.3rem;
    display: inline;
  }
.clicked {
    text-decoration: underline;
  }

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
`;

export default function Admin() {
  let { user } = useContext(User);
  let [selected, setSelected] = useState();
  let [allArticles, setAllArticles] = useState();
  let [allUsers, setAllUsers] = useState();
  let [filter, setFilter] = useState();
  let [filterdArticles, setFilterdArticles] = useState();
  let [filteredUsers, setfilteredUsers] = useState();
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    if (render === true) {
      if (user.role !== "admin") {
        window.location.href = "/";
      }
    } else {
      // Get all articles
      axios
        .get(`http://localhost:${process.env.PORT}/api/articles/getallarticles`)
        .then((result) => {
          setFilterdArticles(result.data);
          setAllArticles(result.data);
        })
        .catch((err) => {
          alert("Something went wrong reloading....");
          setTimeout(() => window.location.reload(), 2000);
        });

      // Get all users
      axios
        .get(`http://localhost:${process.env.PORT}/api/users/getallusers`)
        .then((result) => {
          setfilteredUsers(result.data);
          setAllUsers(result.data);
        })
        .catch((err) => {
          alert("Something went wrong reloading....");
          setTimeout(() => window.location.reload(), 2000);
        });
    }
  }, [render, user]);

  // Functions

  let clicked = (e) => {
    let elements = document.querySelectorAll(".click-text");
    elements.forEach((element) => {
      element.classList.remove("clicked");
    });
    e.target.classList.add("clicked");
  };

  let filteringArticles = () => {
    if (!filter) {
      setFilterdArticles(allArticles);
    }
    let result = [];
    allArticles.map((article) => {
      if (
        article.author.toLowerCase().includes(filter.toLowerCase()) ||
        article.title.toLowerCase().includes(filter.toLowerCase())
      ) {
        result.push(article);
      }
    });
    setFilterdArticles(result);
  };

  let filteringUsers = () => {
    if (!filter) {
      setfilteredUsers(allUsers);
    }
    let result = [];
    allUsers.map((user) => {
      if (
        user.name.toLowerCase().includes(filter.toLowerCase()) ||
        user.email.toLowerCase().includes(filter.toLowerCase()) ||
        user.role.toLowerCase().includes(filter.toLowerCase())
      ) {
        result.push(user);
      }
    });
    setfilteredUsers(result);
  };

  return (
    <AdminPannel>
      <p
        className="click-text"
        onClick={(e) => {
          clicked(e);
          setSelected("users");
        }}
      >
        Users
      </p>
      <p
        className="click-text"
        onClick={(e) => {
          clicked(e);
          setSelected("articles");
        }}
      >
        Articles
      </p>

      {selected && (
        <>
          {selected == "users" ? (
            <>
              {filteredUsers && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Search by name, email, role...np "
                      onChange={(e) => setFilter(e.target.value)}
                    />{" "}
                    <button onClick={() => filteringUsers()}>Search</button>
                  </div>
                  <div className="containter">
                    <table>
                      <thead>
                        <tr>
                          <th>User id</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => {
                          return (
                            <tr>
                              <td>{user._id}</td>
                              <td>
                                <a href={`/admin/user/${user._id}`}>
                                  {user.name}
                                </a>
                              </td>
                              <td>{user.email}</td>
                              <td>{user.role}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {filterdArticles && (
                <>
                  <div>
                    <input
                      type="text"
                      placeholder="Search by title or author"
                      onChange={(e) => setFilter(e.target.value)}
                    />{" "}
                    <button onClick={() => filteringArticles()}>Search</button>
                  </div>
                  <div className="containter">
                    <table>
                      <thead>
                        <tr>
                          <th>Article id</th>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Author id</th>
                          <th>Created on</th>
                          <th>Last modified on</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filterdArticles.map((article) => {
                          return (
                            <tr>
                              <td>{article._id}</td>
                              <td>
                                <a href={`/articles/${article._id}`}>
                                  {article.title}
                                </a>
                              </td>
                              <td>{article.author}</td>
                              <td>{article.authorId}</td>
                              <td>{article.createdAt.substring(0, 10)}</td>
                              <td>{article.updatedAt.substring(0, 10)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </AdminPannel>
  );
}
