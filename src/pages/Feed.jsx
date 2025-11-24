import React, { useEffect, useState } from "react";
import { api } from "../api.js";
import PostCard from "../components/PostCard.jsx";

export default function Feed({ user }) {
    const [posts, setPosts] = useState([]);
    const [form, setForm] = useState({ caption: "", image: "" });
    const [ghost, setGhost] = useState(false);

    const load = async () => {
        const { data } = await api.get("/posts");
        setPosts(data);
    };

    useEffect(() => {
        load();
        (async () => {
            const { data } = await api.get(`/user/${user._id}`);
            setGhost(data.ghostMode);
        })();
    }, []);

    const createPost = async () => {
        await api.post("/posts", { user: user._id, caption: form.caption, image: form.image });
        setForm({ caption: "", image: "" });
        load();
    };

    const like = async (postId) => {
        await api.put(`/posts/${postId}/like`, { user: user._id });
        load();
    };

    const comment = async (postId, payload) => {
        await api.post(`/posts/${postId}/comment`, { user: user._id, ...payload });
        load();
    };

    const toggleGhost = async () => {
        await api.put(`/user/${user._id}/ghost`, { enabled: !ghost });
        setGhost(!ghost);
        load();
    };

    return (
        <div>
            <h2>Ghosain Feed</h2>

            {/* Post create form */}
            <div style={{ marginBottom: 16 }}>
                <input
                    placeholder="Caption"
                    value={form.caption}
                    onChange={(e) => setForm({ ...form, caption: e.target.value })}
                />
                <input
                    placeholder="Image URL"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                />
                <button onClick={createPost}>Post</button>
            </div>

            {/* Ghost mode toggle */}
            <div style={{ marginBottom: 16 }}>
                <label>
                    Ghost Mode: {ghost ? "ON" : "OFF"}{" "}
                    <button onClick={toggleGhost}>{ghost ? "Disable" : "Enable"}</button>
                </label>
            </div>

            {/* Feed posts */}
            {posts.map((p) => (
                <PostCard key={p._id} post={p} onLike={like} onComment={comment} />
            ))}
        </div>
    );
}