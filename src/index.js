import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Provider } from "react-redux";
import { store } from "./app/Store";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWt8dxLtzZEjoIwkGCndjuqPG0L77MsWw",
  authDomain: "ecommerce-34bbe.firebaseapp.com",
  databaseURL: "https://ecommerce-34bbe-default-rtdb.firebaseio.com",
  projectId: "ecommerce-34bbe",
  storageBucket: "ecommerce-34bbe.appspot.com",
  messagingSenderId: "235762387524",
  appId: "1:235762387524:web:5909140bf8a315472c4a11",
  measurementId: "G-CHPR23D1G5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
