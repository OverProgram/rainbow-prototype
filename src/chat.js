import "./common"
import firebase from "firebase/app";

import "firebase/auth"
import "firebase/database"

import React, {Component} from "react";
import ReactDOM from "react-dom";

const db = firebase.database;

class ChatApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: null,
        };
    }

    render() {
        if (this.state.room) {
            return (<ChatRoom onExit={() => {this.setState({room: null});}}/>);
        }
        return (<RoomSelector onClick={(roomName) => {this.setState({room: roomName});}}/>);
    }
}

class RoomSelector extends Component {
    constructor(props) {
        super(props);
        let rooms = [];
        db.ref(`users/${firebase.auth().currentUser.uid}/rooms`).once("value", (snapshot) => {
            snapshot.forEach((room) => {
                rooms.push(room.val());
            });
        });
        this.state = {
            rooms: rooms
        };
    }

    render() {
        let elements = [];
        this.state.rooms.forEach((room) => {
            elements.push(<p onClick={() => {this.props.onClick(room)}}>{room}</p>);
        });
        return (<div>
            {elements}
        </div>);
    }
}

class ChatRoom extends Component {
    render() {

    }
}

ReactDOM.render(<ChatApp/>, document.getElementById('chat-room'));
