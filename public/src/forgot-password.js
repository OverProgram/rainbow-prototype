function resetPassword(e) {
    e.preventDefault();

    const email = document.getElementById("forgotPasswordForm").elements.namedItem("email").value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => { document.getElementById("message").innerHTML = "Email sent!"; })
        .catch((error) => { document.getElementById("message").innerHTML = error.message; })
}

document.getElementById("forgotPasswordForm").onsubmit = resetPassword;
