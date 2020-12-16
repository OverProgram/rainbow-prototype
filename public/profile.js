function logOut() {
    firebase.auth().signOut().then(function() {
        location.href = '/';
    }).catch(function(error) {
        // An error happened.
    });
}

function updateProfile(e) {
    e.preventDefault();

    const elements = document.getElementById("updateProfile").elements;
    const name = elements.namedItem("name").value;
    let newUserData = {};

    if (name) {
        newUserData.displayName = name;
    }

    const user = firebase.auth().currentUser;

    user.updateProfile(newUserData).then(() => {
        document.getElementById('updateProfileText').innerText = "Successfully updated profile";
    }).catch((e) => {
        document.getElementById('updateProfileText').innerText = e.message;
    })

    location.reload();
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById('greetingText').innerText += user.displayName + '!';
        document.getElementById('greeting').style.display = "block";
    } else {
        location.href = '/';
    }
})

document.getElementById("updateProfile").onsubmit = updateProfile;
