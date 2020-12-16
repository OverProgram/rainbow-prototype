function signUp(e) {
    e.preventDefault();
    const errorMessage = document.getElementById('error');
    const elements = document.getElementById("signupForm").elements;
    const email = elements.namedItem("email").value;
    const password = elements.namedItem("password").value;
    const name = elements.namedItem("name").value;

    if (!email) {
        errorMessage.innerHTML = "Please enter a valid email address";
        return;
    }
    if (!password) {
        errorMessage.innerHTML = "Please enter a password";
    }
    if (!name) {
        errorMessage.innerHTML = "Please enter a display name";
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        user.updateProfile({
            displayName: name,
        })
        location.href = '/';
    })
    .catch((error) => {
        errorMessage.innerHTML = error.message;
    });
}

document.getElementById("signupForm").onsubmit = signUp;
