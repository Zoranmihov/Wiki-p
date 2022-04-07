import { React, useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

// Style

const HomeDiv = styled.div`
  p {
    margin-top: 5%;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
  }

  img {
    display: block;
    margin: 15px auto;
    max-width: 50%;
    border-radius: 50%;
    object-fit: scale-down;
  }
`;
export default function Home() {


  return (
    <HomeDiv>
          <p>Sharing knowledge</p>
          <img
            src="https://media.istockphoto.com/photos/concept-global-network-connection-picture-id1153009750?b=1&k=20&m=1153009750&s=170667a&w=0&h=krKCjw-6LAUxGsQX3b6YF7kgIXiZKDb4W_w7rfG_870="
            alt="Img"
          />
    </HomeDiv>
  );
}
