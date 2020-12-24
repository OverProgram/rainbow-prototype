function signUp(e) {
    e.preventDefault();
    const message = document.getElementById('message');
    const elements = document.getElementById("signupForm").elements;
    const email = elements.namedItem("email").value;
    const password = elements.namedItem("password").value;
    const name = elements.namedItem("name").value;

    if (!email) {
        message.innerHTML = "Please enter a valid email address";
        return;
    }
    if (!password) {
        message.innerHTML = "Please enter a password";
    }
    if (!name) {
        message.innerHTML = "Please enter a display name";
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => Promise.all([user.updateProfile({ displayName: name }), user])
        .then(([res, user]) => user.sendEmailVerification())
        .then(() => message.innerHTML = "We have sent a verification email to the address " + email + ". Please verify yourself and then <a href=\"/\">Log in</a>."))
        .catch((error) => { message.innerHTML = error.message; });
}

document.getElementById("signupForm").onsubmit = signUp;
