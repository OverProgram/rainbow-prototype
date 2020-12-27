import "./common"
import firebase from "firebase/app";

import "firebase/auth"
import "firebase/database"

const db = firebase.database;

function addMessage(content) {
    let messages = document.getElementById('messages');
    let messageNode = document.createElement('P');
    messageNode.innerHTML = content;
    messages.appendChild(messageNode);
}

function setRoom(roomName) {
    document.getElementById('rooms').style.display = "none";
    document.getElementById('chat-room').style.display = "block";
    let room = db.ref(`rooms/${roomName}`);
    let messages = room.child("messages");

    messages.once("value", (snapshot) => {
        snapshot.forEach((message) => {
            addMessage(message.val().content);
        });
    });

    messages.on("child_added", (message) => {
        addMessage(message.val().content);
    });

    document.getElementById('chat-message-form').onsubmit = (e) => {
        e.preventDefault();
        let newMessage = messages.push();
        newMessage.set({
            content: document.getElementById('message').value,
            timestamp: Date.now(),
            user: firebase.auth.currentUser.uid
        });
    };
}

document.onload = function() {
    let rooms = document.getElementById('rooms');
    db.ref(`users/${firebase.auth().currentUser.uid}/rooms`).once("value", (snapshot) => {
        snapshot.forEach((room) => {
            let p = document.createElement("P");
            p.innerHTML = room.val();
            p.onclick = () => setRoom(room.val());
            rooms.appendChild(p);
        });
    });
}
