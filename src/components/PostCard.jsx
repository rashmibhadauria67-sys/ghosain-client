import React from "react";

export default function PostCard({ post, onLike, onComment }) {
    return (
        <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
            <div><b>{post.user?.username}</b></div>
            <div>{post.caption}</div>
            {post.image && <img src={post.image} alt="" style={{ maxWidth: "100%", marginTop: 8 }} />}
            <div style={{ marginTop: 8 }}>
                <button onClick={() => onLike(post._id)}>Like ({post.likes?.length || 0})</button>
            </div>
            <div style={{ marginTop: 8 }}>
                <input placeholder="Comment text..." id={`text-${post._id}`} />
                <input placeholder="Voice URL..." id={`voice-${post._id}`} />
                <button onClick={() => {
                    const text = document.getElementById(`text-${post._id}`).value;
                    const voice = document.getElementById(`voice-${post._id}`).value;
                    onComment(post._id, { text, voice });
                }}>Comment</button>
            </div>
            <div style={{ marginTop: 8 }}>
                {(post.comments || []).map((c, i) => (
                    <div key={i}>
                        <span><b>{c.user?.username || "User"}:</b> {c.text || "(voice)"}</span>
                        {c.voice && <audio src={c.voice} controls />}
                    </div>
                ))}
            </div>
        </div>
    );
}