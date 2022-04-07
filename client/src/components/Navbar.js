import { React, useContext } from "react";
import { User } from "../UserContext";
import DropdownMenu from "./DropdownMenu";
import styled from "styled-components";

// Style

const NavBar = styled.nav`
  display: flex;
  max-width: 100%;
  align-items: center;
  background-color: rgba(88, 45, 115, 1);
  color: white;

  label {
    margin-right: auto;
    font-size: 16px;
    padding: 5px;
    max-width: 99%;
  }


  a {
    color: white;
    margin: 5% 3px;
    font-size:16px;
    padding: 5px;
  }
  a:hover {
    text-decoration: underline;
  }

  @media screen and (min-width: 1200px) {
    label {
      font-size: 1.8rem;
    }

    a {
      font-size: 1.5rem;
    }
  }
}
`;

export default function Navbar() {
  let { user } = useContext(User);
  return (
    <NavBar>
      <label>FakeWiki</label>
      <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/articles">Articles</a>
        {user && <DropdownMenu user={user} />}
        {!user && <a href="/login">Account</a>}
      </div>
    </NavBar>
  );
}
