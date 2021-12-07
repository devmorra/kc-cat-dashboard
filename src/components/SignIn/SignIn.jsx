import React from "react";
import { useAuth, useSigninCheck} from "reactfire";
import firebase from "firebase/app";
import { Button } from "@mui/material";
import "firebase/auth";
// import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth";

export function SignIn() {
  // const provider = new GoogleAuthProvider();

  const auth = useAuth();
  const { status, data: signInCheckResult } = useSigninCheck();

  const sign_in = async () => {
    const response = await auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  };

  const sign_out = async () => {
    await auth.signOut();
  };

  const printUser = () => {
    console.log(auth.currentUser);
  };


  if (status === 'loading'){
    return(
      <h1>Loading</h1>
    )
  }

  if (signInCheckResult.signedIn === false) {
    return (
      <div>
        <Button onClick={sign_in}>Sign In With Google</Button>
      </div>
    );
  } else if (signInCheckResult.signedIn === true) {
    // console.log(auth.currentUser);
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={sign_out}>
          Sign Out
        </Button>
        <Button onClick={printUser}>Print User</Button>
        <h1>Hello {auth.currentUser.email}</h1>
      </div>
    );
  }
}
