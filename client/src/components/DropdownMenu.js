import React from "react";
import Cookies from "js-cookie";
import styled from "styled-components";

const StyledDrop = styled.div`
  display: inline;

  .dropdown {
    display: inline;
    overflow: hidden;
    margin: 0px 1px;
  }

  .dropdown .dropbtn {
    border: none;
    outline: none;
    color: white;
    padding: 0px 5px;
    background-color: inherit;
    font-size: 16px;
    font-family: inherit;
    margin: 0;
  }

  .navbar a:hover,
  .dropdown:hover .dropbtn {
    text-decoration: underline;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100px;
    margin: 0px 1px;
    right: 0;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    float: none;
    color: black;
    padding: 12px 16px;
    font-size: 16px;
    text-decoration: none;
    display: block;
    text-align: left;
  }

  .dropdown-content a:hover {
    background-color: #ddd;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  @media screen and (min-width: 1200px) {
    .dropdown .dropbtn {
      font-size: 1.5rem;
    }

    .dropdown-content {
      min-width: 135px;
    }
  }
`;

export default function DropdownMenu({ user }) {
  const logout = () => {
    Cookies.remove("User");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };
  return (
    <StyledDrop>
      <div className="dropdown">
        <button className="dropbtn">{user.name} ↓</button>
        <div className="dropdown-content">
          <a href="/profile">Profile</a>
          {user.role == "admin" ? (<a href="/admin">Admin pannel</a>) : (<></>)}
          <a onClick={() => logout()}>Logout</a>
        </div>
      </div>
    </StyledDrop>
  );
}
