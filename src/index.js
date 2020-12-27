import "./common"
import firebase from "firebase/app";

import "firebase/auth"

function checkSingedIn(user) {
    if (user) {
        location.href = '/chat.html';
    } else {
        document.getElementById('sign-in').style.display = "block";
    }
}

function logIn(e) {
    e.preventDefault();
    const elements = document.getElementById("loginForm").elements;
    const email = elements.namedItem("email").value;
    const password = elements.namedItem("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => { location.href = '/profile.html'; })
        .catch((error) => { document.getElementById('error').innerHTML = error.message; });
}

firebase.auth().onAuthStateChanged(checkSingedIn);

document.getElementById("loginForm").onsubmit = logIn;
