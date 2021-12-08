import React from "react";
import { useAuth, useSigninCheck} from "reactfire";
// import firebase from "firebase/app";
import { Button } from "@mui/material";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export function SignIn() {

  // const auth = useAuth();
  const { status, data: signInCheckResult } = useSigninCheck();

  const auth = getAuth();
  const provider = GoogleAuthProvider();


  const sign_in = async () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

    // const response = await auth.signInWithPopup(
    //   new firebase.auth.GoogleAuthProvider()
    // );
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
