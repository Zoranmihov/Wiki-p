import { React, useState } from "react";
import styled from "styled-components";
import Cookies from "js-cookie";
import axios from "axios";

const Styledlogin = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  
  .card {
    margin: 14px;
    margin-top: 6%;
    border: 1px solid black;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    background-color: white;
    min-width: 40%;
    max-height: 95%;
  }

  p {
    font-size 1.8rem;
    font-weight: 500;
    text-align: center;  
  }
  form {

    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    padding: 7px;
    margin: 8px 0;
  }

  input {
      font-size: 1.2rem;
      padding: 3px;
      margin: 1px 0;
      outline: none;
  }

  input:focus {
    background-color: rgb(240, 240, 240);
  }

  button {
    font-size: 1.2rem;
    padding: 3px;
    margin-top: 15px;
    background-color: white;
    border 1px solid black;
    min-width: 60%;
    align-self: center;
  }

  button:hover {
    background-color: rgb(240, 240, 240);
  }

  span {
    font-size 14px;
    color: red;
  }

  @media screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .card {
        margin: 4px;
    }
  }
}
`;

const validatepassword = (password) => {
  const button = document.querySelector("#sub-btn");
  const passwordfield = document.querySelector("#password");
  const error = document.querySelector("#passerror");
  if (password.length < 8) {
    button.disabled = true;
    passwordfield.style.border = "1px solid red";
    error.innerHTML = "Password must be 8 characters long";
  } else if (password.length >= 8) {
    button.disabled = false;
    passwordfield.style.border = "1px solid #32CD32";
    error.innerHTML = "";
  }
};

const validateemail = (email) => {
  const button = document.querySelector("#sub-btn");
  const emailfield = document.querySelector("#email");
  const error = document.querySelector("#emailerror");
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = regex.test(email);

  if (valid) {
    button.disabled = false;
    emailfield.style.border = "1px solid #32CD32";
    error.innerHTML = "";
  } else {
    emailfield.style.border = "1px solid red";
    button.disabled = true;
    error.innerHTML = "Invalid email";
  }
};

export default function Login() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [logemail, setlogemail] = useState("");
  const [logpassword, setlogpassword] = useState("");

  const register = (e) => {
    e.preventDefault();
    if (password != cpassword) {
      alert("Passwords don't match");
    } else {
      let newUser = {
        name,
        email,
        password,
      };
      axios
        .post("http://localhost:5000/api/users/register", newUser)
        .then(
          (res) =>
            (document.querySelector("#register-message").innerHTML =
              res.data.message)
        )
        .catch(
          (res) =>
            (document.querySelector("#register-message").innerHTML =
              res.data.message)
        );
    }
  };

  const login = (e) => {
    e.preventDefault();
    let user = {
      email: logemail,
      password: logpassword,
    };
    axios
      .post("http://localhost:5000/api/users/login", user)
      .then((res) => {
        if(res.data.foundUser){
          Cookies.set("User", `${JSON.stringify(res.data.foundUser)}`, {
            expires: 7,
          });
          document.querySelector("#login-message").innerHTML = res.data.message;
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);

        } else {
          document.querySelector("#login-message").innerHTML = res.data.message;
        }
      })
      .catch((res) => {
        document.querySelector("#login-message").innerHTML = res.data.message;
      });
  };

  return (
    <Styledlogin>
      <div className="card">
        <p id="login-message">Login:</p>
        <form onSubmit={(e) => login(e)}>
          <label htmlFor="">Email</label>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setlogemail(e.target.value)}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setlogpassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="card">
        <p id="register-message">Register:</p>
        <form
          onSubmit={(e) => {
            register(e);
          }}
        >
          <label htmlFor="">Name</label>
          <input
            required
            type="text"
            onChange={(e) => {
              setname(e.target.value[0].toUpperCase());
            }}
          />
          <label htmlFor="">Email</label>
          <input
            required
            type="text"
            id="email"
            onChange={(e) => {
              validateemail(e.target.value);
              setemail(e.target.value);
            }}
          />{" "}
          <span id="emailerror"></span>
          <label htmlFor="">Password</label>
          <input
            required
            type="password"
            id="password"
            onChange={(e) => {
              validatepassword(e.target.value);
              setpassword(e.target.value);
            }}
          />{" "}
          <span id="passerror"></span>
          <label htmlFor="">Confirm password</label>
          <input
            required
            type="password"
            onChange={(e) => {
              setcpassword(e.target.value);
            }}
          />
          <button id="sub-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </Styledlogin>
  );
}
