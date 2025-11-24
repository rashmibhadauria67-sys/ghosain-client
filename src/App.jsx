import React, { useState } from "react";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Feed from "./pages/Feed.jsx";
import Friends from "./pages/Friends.jsx";
import Chat from "./pages/Chat.jsx";

export default function App() {
    const [user, setUser] = useState(null);
    const [page, setPage] = useState("login");

    const go = (p) => setPage(p);

    if (!user) {
        return page === "signup"
            ? <Signup onSuccess={(u) => { setUser(u); setPage("feed"); }} go={go} />
            : <Login onSuccess={(u) => { setUser(u); setPage("feed"); }} go={go} />;
    }

    return (
        <div style={{ padding: 16 }}>
            <h1>Welcome to Ghosain</h1>
            <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <button onClick={() => go("feed")}>Feed</button>
                <button onClick={() => go("friends")}>Friends</button>
                <button onClick={() => go("chat")}>Chat</button>
                <button onClick={() => { setUser(null); setPage("login"); }}>Logout</button>
            </nav>

            {page === "feed" && <Feed user={user} />}
            {page === "friends" && <Friends user={user} />}
            {page === "chat" && <Chat user={user} />}
        </div>
    );
}