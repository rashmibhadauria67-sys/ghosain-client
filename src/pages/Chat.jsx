import React, { useEffect, useState } from "react";
import { api } from "../api.js";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Chat({ user }) {
    const [receiver, setReceiver] = useState("");
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [voice, setVoice] = useState("");

    useEffect(() => {
        socket.emit("join", user._id);
        socket.on("receive_message", (msg) => {
            setMessages(prev => [...prev, msg]);
        });
        return () => {
            socket.off("receive_message");
        };
    }, [user._id]);

    const loadHistory = async () => {
        if (!receiver) return;
        const { data } = await api.get(`/chat/${user._id}/${receiver}`);
        setMessages(data);
    };

    const send = async () => {
        if (!receiver) return;
        await api.post("/chat/send", { sender: user._id, receiver, text, voice });
        socket.emit("send_message", { sender: user._id, receiver, text, voice });
        setText(""); setVoice("");
        loadHistory();
    };

    return (
        <div>
            <h2>Ghosain Live Chat</h2>
            <input
                placeholder="Receiver userId"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
            />
            <button onClick={loadHistory}>Load History</button>

            <div style={{ marginTop: 12 }}>
                <input
                    placeholder="Message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    placeholder="Voice URL"
                    value={voice}
                    onChange={(e) => setVoice(e.target.value)}
                />
                <button onClick={send}>Send</button>
            </div>

            <div style={{ marginTop: 16 }}>
                {messages.map((m, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                        <b>{m.sender === user._id ? "You" : "Friend"}:</b> {m.text || "(voice)"}
                        {m.voice && <audio src={m.voice} controls style={{ display: "block" }} />}
                    </div>
                ))}
            </div>
        </div>
    );
}