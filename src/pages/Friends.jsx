import React, { useEffect, useState } from "react";
import { api } from "../api.js";

export default function Friends({ user }) {
    const [friends, setFriends] = useState([]);
    const [receiver, setReceiver] = useState("");

    const load = async () => {
        const { data } = await api.get(`/friends/list/${user._id}`);
        setFriends(data);
    };

    useEffect(() => { load(); }, []);

    const sendReq = async () => {
        await api.post("/friends/send", { sender: user._id, receiver });
        setReceiver("");
        load();
    };

    return (
        <div>
            <h2>Ghosain Friends</h2>
            <div style={{ marginBottom: 12 }}>
                <input
                    placeholder="Receiver userId"
                    value={receiver}
                    onChange={(e) => setReceiver(e.target.value)}
                />
                <button onClick={sendReq}>Send Request</button>
            </div>
            <ul>
                {friends.map(f => <li key={f._id}>{f.username} ({f.email})</li>)}
            </ul>
        </div>
    );
}