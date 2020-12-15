function logOut() {
    firebase.auth().signOut().then(function() {
        location.href = '/';
    }).catch(function(error) {
        // An error happened.
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById('greetingText').innerText += user.email;
        document.getElementById('greeting').style.display = "block";
    } else {
        location.href = '/';
    }
})
