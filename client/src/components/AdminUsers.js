import { React, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { User } from "../UserContext";

const AdminUser = styled.div`
text-align: center;
  

  .container {
    margin: 14px auto;
    margin-top: 6%;
    border: 1px solid black;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    background-color: white;
    min-width: 40%;
    max-width: 80%;
    max-height: 95%;
  }
  
  p {
    font-size 1.8rem;
  }

  label {
    text-align: start !important;
    margin: 1px;
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

select {
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
`;

export default function AdminUsers() {
  let { user } = useContext(User);
  let url = window.location.pathname.split("/");
  let id = { id: url[3] };

  const [cUser, setCUser] = useState();
  let [render, setRender] = useState(false);
  const [name, setname] = useState();
  const [email, setemail] = useState();
  const [newpassword, setnewpassword] = useState();
  const [cpassword, setcpassword] = useState();

  useEffect(() => {
    setRender(true);
  }, []);

  useEffect(() => {
    if (render === true) {
      if (user.role !== "admin") {
        window.location.href = "/";
      }
    } else {
      axios
        .post("http://localhost:5000/api/users/getuser", id)
        .then((res) => {
          setCUser(res.data);
        })
        .catch((err) => {
          document.querySelector("#title").innerHTML =
            "Something went wrong please try again";
          setTimeout(() => window.location.reload(), 2000);
        });
    }
  }, [render, user]);

  // Functions
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

  let updateuser = (e) => {
    e.preventDefault();
    if (newpassword != cpassword) {
      alert("Passwords don't match");
    } else {
      // Updated user not working corectly work here needs to be done
      let updatedUser = {
        id: cUser._id,
        name: cUser.name,
        email: cUser.email,
      };

      if (name) {
        updatedUser.name = name;
      }
      if (email) {
        updatedUser.email = email;
      }
      if (newpassword) {
        updatedUser.password = newpassword;
      }
      axios
        .put("http://localhost:5000/api/users/update", updatedUser)
        .then((res) => {
          document.querySelector("#title").innerHTML =
            "User updated refreshing page";
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((err) => {
          document.querySelector("#title").innerHTML = err.data.message;
        });
    }
  };

  let deleteProfile = () => {
    if (user.id == id) {
      document.querySelector("#title").innerHTML =
        "Can't delete your profile from here use the profile screen";
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      let isTrue = window.confirm(
        "Are you sure you want to delete this profile?"
      );
      if (isTrue) {
        axios
          .put("http://localhost:5000/api/users/deleteuser", id)
          .then((res) => {
            document.querySelector("#title").innerHTML = res.data.message;
            setTimeout(() => {
              window.location.href = "/admin";
            }, 2000);
          })
          .catch((err) => {
            document.querySelector("#title").innerHTML = err.data.message;
          });
      }
    }
  };

  return (
    <>
      {cUser && (
        <AdminUser>
          <div className="container">
            <p id="title">Profile:</p>
            <form
              onSubmit={(e) => {
                updateuser(e);
              }}
            >
              <label htmlFor="">Name</label>
              <input
                required
                defaultValue={cUser.name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
                type="text"
              />
              <label htmlFor="">Email</label>
              <input
                required
                defaultValue={cUser.email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                type="text"
              />
              <label htmlFor="">Role</label>
              <select defaultValue={cUser.role}>
                <option value="user">user</option>
                <option value="moderator">moderator</option>
                <option value="admin">admin</option>
              </select>
              <span id="emailerror"></span>
              <label htmlFor="">New Password</label>
              <input
                id="password"
                type="password"
                onChange={(e) => {
                  validatepassword(e.target.value);
                  setnewpassword(e.target.value);
                }}
              />
              <span id="passerror"></span>
              <label htmlFor="">Confirm password</label>
              <input
                type="password"
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
              <button id="sub-btn" type="submit">
                Update Profile
              </button>
              <button onClick={() => deleteProfile()} type="button">
                Delete Profile
              </button>
            </form>
          </div>
        </AdminUser>
      )}
    </>
  );
}
