import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth } from "./firebase";
import { provider } from "./firebase";
import { actionTypes } from "./reducer";
import {useStateValue} from './StateProvider';
//import {Button} from '@material-ui/core';

function Login() {
  const [{user}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      )
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_container">
        <img src="https://upload.wikimedia.org/wikipedia" alt="" />
        <div className="login_text">
          <h1>Sign in to whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </div>
  );
}

export default Login;
