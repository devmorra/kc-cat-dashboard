import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import {
  initializeFirestore,
  enableIndexedDbPersistence,
} from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  FirebaseAppProvider,
  AuthProvider,
  useFirebaseApp,
  useSigninCheck,
  useUser,
  FirestoreProvider,
  useInitFirestore,
  useAuth,
  StorageProvider
} from "reactfire";
import {Button} from '@mui/material';

import {Dashboard} from "./components";

function App() {
  const provider = new GoogleAuthProvider();
  // These hooks require a parent component to have the AuthProvider
  // so they have to be a child of the AppWrapper
  const { userStatus, data: user } = useUser();
  const auth = useAuth();

  const signIn = async () =>{
    const response = await signInWithPopup(auth, provider);
  }

  const signOut = async () => {
    await auth.signOut();
  }

  if (userStatus !== "loading" && user != null) {
    console.log(user);
    return (
      <div>
        <h1>Hello {user.displayName}</h1>
        <Button onClick={signOut}>Sign Out</Button>
        <Dashboard/>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please sign in with your Kitty Connection Google Account</h1>
        <Button onClick={signIn}>Sign In</Button>
      </div>
    );
  }
}

function AppWrapper() {
  // these hooks cannot be used outside the top level so we need to create a wrapper app
  const app = useFirebaseApp();
  const authSDK = getAuth(app);
  const storage = getStorage(app);
  const { status, data: firestoreInstance } = useInitFirestore(
    async (firebaseApp) => {
      const db = initializeFirestore(firebaseApp, {});
      await enableIndexedDbPersistence(db);
      console.log(db);
      return db;
    }
  );
  // const {userStatus, data:user} = useUser();
  // const {status, data:signInCheckResult} = useSigninCheck();
  if (status === "loading") {
    return <h1>Loading</h1>;
  }
  return (
    <AuthProvider sdk={authSDK}>
      <FirestoreProvider sdk={firestoreInstance}>
        <StorageProvider sdk={storage}>
          <App></App>
        </StorageProvider>
      </FirestoreProvider>
    </AuthProvider>
  );
}

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <AppWrapper />
  </FirebaseAppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
