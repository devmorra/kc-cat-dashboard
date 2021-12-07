import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SignIn } from './components/SignIn';
import reportWebVitals from './reportWebVitals';
import { FirebaseAppProvider, useSigninCheck } from 'reactfire';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {firebaseConfig} from './firebaseConfig';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='signin' element={<SignIn/>}></Route>
      </Routes>
    </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
