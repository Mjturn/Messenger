import React, { useState, useEffect } from "react";
import "../styles/Chat.css";

function Chat({ socket, name, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                author: name,
                room: room,
                message: currentMessage
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, { socket });

    return (
        <div id="chat-page-container">
            <div id="chat-page">
                <div id="heading-container">
                    <h3>Chat</h3>
                </div>
                {messageList.map((messageContent) => {
                    return (
                        <><p>{`${messageContent.author}: ${messageContent.message}`}</p></>
                    );
                })}
                <div id="input-container">
                    <input type="text" onChange={(e) => { setCurrentMessage(e.target.value) }} onKeyPress={(e) => { e.key === "Enter" && sendMessage(); }} />
                </div>
                <div id="button-container">
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat