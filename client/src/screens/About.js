import React from "react";
import styled from "styled-components";

// Style
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;

  h1 {
    margin: 1% 0px;
    text-align: center;
  }

  p {
    margin: 7px;
    padding: 10px;
    text-align: justify;
  }

  span {
    font-style: italic;
    font-weight: bold;
  }
`;

export default function About() {
  return (
    <Section>
      <h1>About:</h1>
      <p>
        <span>FakeWiki</span> is a basic CRUD app with more focus on the
        front-end portion of it rather than back-end. A small wiki with a bunch
        of random entries which users can add, modify and delete based on their
        given permissions focused on a minimalistic design built without any
        styling frameworks, only CSS with a bit of help from styled components.
      </p>
    </Section>
  );
}
