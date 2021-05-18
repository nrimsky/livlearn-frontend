import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
// import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCS5XFuudLitTmmCRq9cPkjl4CjebutCZY",
  authDomain: "resourceee-e2166.firebaseapp.com",
  projectId: "resourceee-e2166",
  storageBucket: "resourceee-e2166.appspot.com",
  messagingSenderId: "313558111631",
  appId: "1:313558111631:web:b161e43a004742cca0e7fa",
  measurementId: "G-YWVTH562NL"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

