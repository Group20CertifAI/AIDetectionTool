// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {auth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmbhXwRTMiyXl_y1wrPnOY-mipeAMi8T0",
  authDomain: "certifai-8afc6.firebaseapp.com",
  projectId: "certifai-8afc6",
  storageBucket: "certifai-8afc6.appspot.com",
  messagingSenderId: "1073534950411",
  appId: "1:1073534950411:web:400de3999bd7730c353b0e",
  measurementId: "G-BXVF3JMY0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


  const auth = firebase.auth();


  function login(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    auth.signInWithEmailAndPassword(email, password).then (cred => {
                alert(cred.user.email + " has logged in")
    })
}

function signUp() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    auth.createUserWithEmailAndPassword(email, password).then (cred => {
        alert(cred.user.email + " has signed up")
    })
}

