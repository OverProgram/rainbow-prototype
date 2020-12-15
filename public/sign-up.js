function signUp(e) {
    e.preventDefault();
    const elements = document.getElementById("signupForm").elements;
    const email = elements.namedItem("email").value;
    const password = elements.namedItem("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        location.href = '/';
    })
    .catch((error) => {
        document.getElementById('error').innerHTML = error.message;
    });
}

document.getElementById("signupForm").onsubmit = signUp;
