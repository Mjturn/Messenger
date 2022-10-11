import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat.js";
import "../styles/Join.css";

const socket = io.connect("https://mjturn-messenger.herokuapp.com/");

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div id="join-page-container">
      <div id="join-page">
        {!showChat ?
          <><div id="heading-container">
            <h3>Join a Room</h3>
          </div><div id="inputs-container">
              <input type="text" placeholder="Name" onChange={(e) => { setName(e.target.value); }} />
              <input type="text" placeholder="Room" onChange={(e) => { setRoom(e.target.value); }} />
            </div><div id="button-container">
              <button type="submit" onClick={joinRoom}>Join a Room</button>
            </div></>
          : <Chat id="chat" socket={socket} name={name} room={room} />
        }
      </div>
    </div>
  );
}

export default Join;
